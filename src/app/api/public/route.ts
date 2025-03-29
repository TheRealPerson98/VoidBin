import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIP } from '@/lib/ip';

const HOURLY_REQUEST_LIMIT = 5000;

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
  if (ipLimit.pasteCount >= HOURLY_REQUEST_LIMIT) {
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

export async function GET(request: NextRequest) {
  try {
    const ipAddress = await getClientIP();
    const canProcessRequest = await checkIPLimit(ipAddress);
    
    if (!canProcessRequest) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }
    
    const siteUrl = process.env.SITE_URL || 'https://voidbin.vercel.app';
    
    return NextResponse.json({
      message: 'yes',
      made_with: siteUrl,
      rate_limit: {
        limit: HOURLY_REQUEST_LIMIT,
        period: '1 hour',
        per: 'IP address'
      }
    });
  } catch (error) {
    console.error('Error processing public API request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 