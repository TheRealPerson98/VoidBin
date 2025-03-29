'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function DupePastePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);

  // Check for paste ID in query params
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      fetchPaste(id);
    }
  }, [searchParams]);

  async function fetchPaste(id: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/paste/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch paste');
      }
      const paste = await response.json();
      setContent(paste.content);
      setTitle(paste.title || '');
    } catch (error) {
      setError('Could not load the paste');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Content cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Auto-detect language
      let language = 'plaintext';
      if (content.includes('function') || content.includes('class')) {
        language = 'javascript';
      }
      
      const response = await fetch('/api/paste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          language,
          title,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create paste');
      }
      
      setSuccessId(data.id);
      setIsSubmitting(false);
      
    } catch (error) {
      console.error('Error creating paste:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      setIsSubmitting(false);
    }
  }

  const handleNew = () => {
    setContent('');
    setTitle('');
    setError('');
    setSuccessId(null);
  };

  const handleViewPaste = () => {
    if (successId) {
      router.push(`/paste/${successId}`);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a171e] text-white">
      <header className="flex items-center justify-between bg-[#0d1f2b] border-b border-[#1c313f] h-12">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-2 py-1 bg-transparent border-none outline-none w-full text-white"
          />
        </div>
        <div className="flex items-center gap-1 pr-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !!successId}
            className="px-3 py-1 bg-[#1a3b50] hover:bg-[#254963] rounded text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : successId ? 'Saved!' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="px-3 py-1 bg-[#1a3b50] hover:bg-[#254963] rounded text-sm"
          >
            New
          </button>
          <Link
            href="/paste"
            className="px-3 py-1 bg-[#1a3b50] hover:bg-[#254963] rounded text-sm inline-block"
          >
            Code
          </Link>
          <Link
            href="/paste/text"
            className="px-3 py-1 bg-[#1a3b50] hover:bg-[#254963] rounded text-sm inline-block"
          >
            Just Text
          </Link>
        </div>
      </header>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading paste...</p>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-full p-4 font-mono bg-[#0a171e] border-none outline-none resize-none text-white"
            spellCheck={false}
          />
        )}
        
        {error && (
          <div className="p-2 text-red-500 bg-[#0d1f2b]">{error}</div>
        )}
      </form>

      {/* Success Popup */}
      {successId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#0d1f2b] border border-[#1c313f] rounded-lg p-6 max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-3 text-green-400">Paste Saved Successfully!</h3>
            <p className="mb-4">Your duplicate paste has been created and is ready to view.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleViewPaste}
                className="px-4 py-2 bg-[#1a3b50] hover:bg-[#254963] rounded text-white"
              >
                View Paste
              </button>
              <button
                onClick={handleNew}
                className="px-4 py-2 bg-[#254963] hover:bg-[#315b78] rounded text-white"
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 