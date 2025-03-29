import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
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