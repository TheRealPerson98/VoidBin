import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIP } from '@/lib/ip';

const HOURLY_PASTE_LIMIT = 5000;
// Define allowed origins for GET requests
const ALLOWED_ORIGINS = ['https://voidbin.com/', 'http://localhost:3000'];

// Helper function to check if request is from allowed origin
function isRequestFromAllowedOrigin(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  if (!referer) return false;
  
  return ALLOWED_ORIGINS.some(origin => referer.startsWith(origin));
}

async function checkIPLimit(ipAddress: string): Promise<boolean> {
  const now = new Date();
  
  // Find or create IP limit record
  let ipLimit = await prisma.iPLimit.findUnique({ where: { ipAddress } });
  
  if (!ipLimit) {
    // Create new IP limit record for this IP
    const resetTime = new Date(now);
    resetTime.setHours(now.getHours() + 1);
    resetTime.setMinutes(0, 0, 0); // Reset at the next hour
    
    ipLimit = await prisma.iPLimit.create({
      data: {
        ipAddress,
        pasteCount: 0,
        resetAt: resetTime,
      },
    });
  }
  
  // Check if we need to reset the counter
  if (ipLimit.resetAt < now) {
    const resetTime = new Date(now);
    resetTime.setHours(now.getHours() + 1);
    resetTime.setMinutes(0, 0, 0);
    
    ipLimit = await prisma.iPLimit.update({
      where: { id: ipLimit.id },
      data: {
        pasteCount: 0,
        resetAt: resetTime,
      },
    });
  }
  
  // Check if limit exceeded
  if (ipLimit.pasteCount >= HOURLY_PASTE_LIMIT) {
    return false;
  }
  
  // Increment paste count
  await prisma.iPLimit.update({
    where: { id: ipLimit.id },
    data: {
      pasteCount: ipLimit.pasteCount + 1,
    },
  });
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = await getClientIP();
    const canCreatePaste = await checkIPLimit(ipAddress);
    
    if (!canCreatePaste) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { content, language = 'plaintext', title = '' } = body;
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Content cannot be empty' },
        { status: 400 }
      );
    }
    
    const paste = await prisma.paste.create({
      data: {
        content,
        language,
        title,
        ipAddress,
      },
    });
    
    if (!paste || !paste.id) {
      throw new Error('Failed to create paste');
    }
    
    return NextResponse.json({ id: paste.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating paste:', error);
    return NextResponse.json(
      { error: 'Failed to create paste' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Only allow GET requests from the website
    if (!isRequestFromAllowedOrigin(request)) {
      return NextResponse.json(
        { error: 'Access denied. This API endpoint can only be accessed from the VoidBin website.' },
        { status: 403 }
      );
    }

    const recentPastes = await prisma.paste.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, language: true, createdAt: true },
    });
    
    return NextResponse.json(recentPastes);
  } catch (error) {
    console.error('Error fetching recent pastes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent pastes' },
      { status: 500 }
    );
  }
} 