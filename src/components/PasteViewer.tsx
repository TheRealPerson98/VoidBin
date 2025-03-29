'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PasteViewerProps {
  content: string;
  language: string;
  title?: string;
  id: string;
}

export default function PasteViewer({ content, language, title, id }: PasteViewerProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    setCharCount(content.length);
    setLineCount(content.split('\n').length);
    
    // Add subtle background animation
    document.body.classList.add('bg-animate');
    return () => {
      document.body.classList.remove('bg-animate');
    };
  }, [content]);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
        <div className="flex items-center gap-2 flex-1 px-2">
          <motion.div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: language === 'plaintext' ? '#768390' : '#58a6ff',
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-sm text-gray-400 font-medium">
            {language}
          </span>
          <span className="mx-2 text-gray-600">•</span>
          {title ? (
            <span className="text-white font-medium text-lg">{title}</span>
          ) : (
            <span className="text-gray-400 font-medium text-lg">Untitled</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={copyToClipboard}
            className="relative px-4 py-2 rounded text-sm font-medium overflow-hidden group"
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-[#1f6feb] group-hover:bg-[#388bfd] rounded"></span>
            <span className="relative flex items-center justify-center gap-1">
              {isCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Copied!
                </>
              ) : 'Copy'}
            </span>
          </motion.button>
          
          <div className="flex items-center gap-1">
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href="/paste"
                className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 inline-block font-medium"
              >
                New
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={`/paste/dupe?id=${id}`}
                className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 inline-block font-medium"
              >
                Dupe/Edit
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href="/paste/text"
                className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm border border-[#30363d] transition-colors duration-200 inline-block font-medium"
              >
                Just Text
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      <div className="flex-1 overflow-auto relative">
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-10 z-10 bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              paddingRight: '2.5rem',
              backgroundColor: '#0d1117',
              height: '100%',
              fontSize: '0.95rem',
              borderRadius: 0,
              lineHeight: 1.6,
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: '#444d56',
              textAlign: 'right',
              userSelect: 'none',
            }}
            codeTagProps={{
              style: {
                fontFamily: '"Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas, monospace',
                fontWeight: 400,
              },
            }}
          >
            {content}
          </SyntaxHighlighter>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex items-center justify-end px-4 py-2 bg-[#161b22] border-t border-[#30363d] text-sm text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span className="text-gray-600">•</span>
          <span>{charCount} characters</span>
        </div>
      </motion.div>
    </div>
  );
} 