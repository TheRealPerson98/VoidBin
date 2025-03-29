import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PasteViewer from '@/components/PasteViewer';
import type { Metadata } from 'next';

interface PastePageProps {
  params: {
    id: string;
  };
}

async function getPaste(id: string) {
  try {
    const paste = await prisma.paste.findUnique({
      where: { id },
    });
    
    return paste;
  } catch (error) {
    console.error('Error fetching paste:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PastePageProps
): Promise<Metadata> {
  const { id } = params;
  const paste = await getPaste(id);
  
  if (!paste) {
    return {
      title: 'Paste Not Found',
    };
  }
  
  // Create a preview from the first few lines
  const contentPreview = paste.content
    .split('\n')
    .slice(0, 3)
    .join('\n')
    .substring(0, 150);
  
  return {
    title: paste.title || 'Untitled Paste',
    description: contentPreview || 'No content',
  };
}

export default async function PastePage({ params }: PastePageProps) {
  const { id } = params;
  
  if (!id) {
    notFound();
  }
  
  const paste = await getPaste(id);
  
  if (!paste) {
    notFound();
  }
  
  return (
    <PasteViewer
      content={paste.content}
      language={paste.language}
      title={paste.title || undefined}
      id={paste.id}
    />
  );
} 