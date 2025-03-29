import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define allowed origins for GET requests
const ALLOWED_ORIGINS = ['https://voidbin.vercel.app', 'http://localhost:3000'];

// Helper function to check if request is from allowed origin
function isRequestFromAllowedOrigin(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  if (!referer) return false;
  
  return ALLOWED_ORIGINS.some(origin => referer.startsWith(origin));
}

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Only allow GET requests from the website
    if (!isRequestFromAllowedOrigin(request)) {
      return NextResponse.json(
        { error: 'Access denied. This API endpoint can only be accessed from the VoidBin website.' },
        { status: 403 }
      );
    }
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Paste ID is required' },
        { status: 400 }
      );
    }

    const paste = await prisma.paste.findUnique({
      where: { id },
    });

    if (!paste) {
      return NextResponse.json(
        { error: 'Paste not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(paste);
  } catch (error) {
    console.error('Error fetching paste:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paste' },
      { status: 500 }
    );
  }
} 