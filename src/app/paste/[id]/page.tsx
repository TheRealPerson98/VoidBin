import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PasteViewer from '@/components/PasteViewer';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

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
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;
  
  // fetch data
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
  
  // optionally access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: paste.title || 'Untitled Paste',
    description: contentPreview || 'No content',
    openGraph: {
      title: paste.title || 'Untitled Paste',
      description: contentPreview || 'VoidBin Paste',
      images: [...previousImages],
    },
  };
}

export default async function PastePage({ params }: Props) {
  const { id } = await params;
  
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