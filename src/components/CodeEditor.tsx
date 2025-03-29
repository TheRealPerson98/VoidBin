'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Function to auto-detect language from content
const detectLanguage = (content: string): string => {
  // Simple detection based on file extensions or content patterns
  if (content.includes('function') && (content.includes('=>') || content.includes('{'))) {
    return 'javascript';
  }
  if (content.includes('interface') || content.includes('type ') || content.includes('<T>')) {
    return 'typescript';
  }
  if (content.includes('<html') || content.includes('<!DOCTYPE')) {
    return 'html';
  }
  if (content.includes('@import') || content.includes('.class {')) {
    return 'css';
  }
  if (content.includes('def ') || content.includes('import ') && content.includes(':')) {
    return 'python';
  }
  if (content.includes('public class') || content.includes('private void')) {
    return 'java';
  }
  if (content.includes('namespace') || content.includes('using System;')) {
    return 'csharp';
  }
  if (content.includes('<?php')) {
    return 'php';
  }
  if (content.includes('SELECT ') && content.includes(' FROM ')) {
    return 'sql';
  }
  if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
    try {
      JSON.parse(content);
      return 'json';
    } catch {
      // Not valid JSON
    }
  }
  
  return 'plaintext';
};

export default function CodeEditor() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Add subtle background animation
  useEffect(() => {
    document.body.classList.add('bg-animate');
    return () => {
      document.body.classList.remove('bg-animate');
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Content cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Auto-detect language from content
      const language = detectLanguage(content);
      
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

  const handleJustText = () => {
    router.push('/paste/text');
  };

  const handleViewPaste = () => {
    if (successId) {
      router.push(`/paste/${successId}`);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0d1117] text-white overflow-hidden">
      <motion.header 
        className="flex items-center justify-between bg-[#161b22] border-b border-[#30363d] h-14 px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 px-2 relative">
          <motion.div 
            className={`absolute -left-1 h-6 w-[3px] bg-[#58a6ff] ${isInputFocused ? 'opacity-100' : 'opacity-0'}`}
            initial={false}
            animate={{ opacity: isInputFocused ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="px-2 py-1 bg-transparent border-none outline-none w-full text-white font-medium text-lg transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !!successId}
            className="relative px-4 py-2 rounded text-sm font-medium overflow-hidden group"
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-[#1f6feb] group-hover:bg-[#388bfd] rounded"></span>
            <span className="relative flex items-center justify-center gap-1">
              {isSubmitting ? (
                <>
                  <motion.span 
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  <span>Saving</span>
                </>
              ) : successId ? 'Saved!' : 'Save'}
            </span>
          </motion.button>
          
          <div className="flex items-center gap-1">
            <motion.button
              type="button"
              onClick={handleNew}
              className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 font-medium"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              New
            </motion.button>
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href="/paste/dupe"
                className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 inline-block font-medium"
              >
                Dupe/Edit
              </Link>
            </motion.div>
            <motion.button
              type="button"
              onClick={handleJustText}
              className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 font-medium"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              Just Text
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-full p-6 font-mono bg-[#0d1117] border-none outline-none resize-none text-white text-opacity-90 leading-relaxed tracking-wide placeholder:text-gray-500 transition-all duration-200 focus:text-opacity-100"
            spellCheck={false}
          />
          <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
            {content.length > 0 && <span>{content.length} characters</span>}
          </div>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              className="p-3 text-[#f85149] bg-[#161b22] border-t border-[#30363d] font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Success Popup */}
      <AnimatePresence>
        {successId && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#238636] flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Paste Saved Successfully!
              </motion.h3>
              <motion.p 
                className="mb-6 text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your paste has been created and is ready to view.
              </motion.p>
              <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleViewPaste}
                  className="px-5 py-2 bg-[#1f6feb] hover:bg-[#388bfd] rounded-md text-white font-medium transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  View Paste
                </motion.button>
                <motion.button
                  onClick={handleNew}
                  className="px-5 py-2 bg-[#21262d] hover:bg-[#30363d] rounded-md text-white font-medium border border-[#30363d] transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  Create New
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 