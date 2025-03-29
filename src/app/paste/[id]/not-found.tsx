import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen p-8 sm:p-8 font-[family-name:var(--font-geist-sans)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Paste Not Found</h1>
        <p className="text-lg text-gray-500 mb-8">The paste you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-foreground text-background rounded hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        >
          Create New Paste
        </Link>
      </div>
    </div>
  );
} 