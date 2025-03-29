'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

export default function Home() {
  interface Paste {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }

  const [recentPastes, setRecentPastes] = useState<Paste[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add background animation
    document.body.classList.add('bg-animate');
    return () => {
      document.body.classList.remove('bg-animate');
    };
  }, []);

  useEffect(() => {
    async function fetchRecentPastes() {
      try {
        const response = await fetch('/api/paste');
        if (response.ok) {
          const data = await response.json();
          setRecentPastes(data);
        }
      } catch (error) {
        console.error('Error fetching recent pastes:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentPastes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col overflow-x-hidden">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-[-50%] left-[20%] w-[500px] h-[500px] bg-[#1f6feb] rounded-full opacity-[0.07] blur-[100px] z-0"></div>
        
        <motion.div 
          className="container mx-auto px-4 py-16 md:py-24 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#58a6ff]">Void</span>Bin
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A sleek, modern pastebin with syntax highlighting and real-time collaboration.
              Share code snippets quickly and securely.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/paste" 
                className="px-8 py-3 bg-[#1f6feb] hover:bg-[#388bfd] rounded-md text-white font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Create New Paste
              </Link>
              <Link 
                href="/docs" 
                className="px-8 py-3 bg-[#21262d] hover:bg-[#30363d] rounded-md text-white font-medium border border-[#30363d] transition-colors duration-200 flex items-center justify-center"
              >
                API Documentation
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative mx-auto max-w-4xl rounded-lg overflow-hidden shadow-2xl border border-[#30363d]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="h-10 bg-[#161b22] flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="mx-auto text-gray-400 text-sm">example.js</div>
            </div>
            <div className="bg-[#0d1117] p-6 font-mono text-[#e6edf3] text-sm leading-relaxed overflow-hidden">
              <div className="language-javascript">
                <div className="mb-2"><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">voidBin</span> <span className="text-white">=</span> <span className="text-white">&#123;</span></div>
                <div className="ml-4 mb-2"><span className="text-[#d2a8ff]">createPaste</span><span className="text-white">(</span><span className="text-[#79c0ff]">content</span><span className="text-white">,</span> <span className="text-[#79c0ff]">language</span><span className="text-white">,</span> <span className="text-[#79c0ff]">title</span><span className="text-white">)</span> <span className="text-white">&#123;</span></div>
                <div className="ml-8 mb-2"><span className="text-[#ff7b72]">return</span> <span className="text-[#d2a8ff]">fetch</span><span className="text-white">(</span><span className="text-[#a5d6ff]">&#39;/api/paste&#39;</span><span className="text-white">,</span> <span className="text-white">&#123;</span> <span className="text-[#a5d6ff]">{/* request options */}</span> <span className="text-white">&#125;);</span></div>
                <div className="ml-4 mb-2"><span className="text-white">&#125;,</span></div>
                <div className="ml-4 mb-2"><span className="text-[#d2a8ff]">getPaste</span><span className="text-white">(</span><span className="text-[#79c0ff]">pasteId</span><span className="text-white">)</span> <span className="text-white">&#123;</span></div>
                <div className="ml-8 mb-2"><span className="text-[#ff7b72]">return</span> <span className="text-[#d2a8ff]">fetch</span><span className="text-white">(</span><span className="text-[#a5d6ff]">&#39;/api/paste/&#39;</span> <span className="text-white">+</span> <span className="text-[#79c0ff]">pasteId</span><span className="text-white">);</span></div>
                <div className="ml-4 mb-2"><span className="text-white">&#125;</span></div>
                <div className="mb-4"><span className="text-white">&#125;;</span></div>
                <div className="mb-2"><span className="text-[#79c0ff]">voidBin</span><span className="text-[#d2a8ff]">.createPaste</span><span className="text-white">(</span><span className="text-[#a5d6ff]">&#39;console.log(&quot;Hello world!&quot;)&#39;</span><span className="text-white">)</span></div>
                <div className="ml-2 mb-2"><span className="text-white">.</span><span className="text-[#d2a8ff]">then</span><span className="text-white">(</span><span className="text-[#79c0ff]">response</span> <span className="text-white">=&gt;</span> <span className="text-white">&#123;</span></div>
                <div className="ml-4"><span className="text-[#d2a8ff]">console.log</span><span className="text-white">(</span><span className="text-[#a5d6ff]">&#39;Paste created!&#39;</span><span className="text-white">);</span></div>
                <div className="ml-2"><span className="text-white">&#125;);</span></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features section */}
      <motion.div 
        className="py-16 bg-[#161b22]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <div className="w-12 h-12 rounded-full bg-[#1f6feb]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Syntax Highlighting</h3>
              <p className="text-gray-400">
                Automatic language detection and beautiful syntax highlighting for over 100 programming languages.
              </p>
            </div>
            
            <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <div className="w-12 h-12 rounded-full bg-[#1f6feb]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-400">
                Lightning-fast performance with Next.js and secure storage of your code snippets.
              </p>
            </div>
            
            <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <div className="w-12 h-12 rounded-full bg-[#1f6feb]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-400">
                Share code snippets with colleagues and friends with simple, shareable links.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Paste Statistics section */}
      <motion.div 
        className="py-16 bg-[#0d1117]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Paste Statistics</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#161b22] rounded-lg border border-[#30363d] text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-400">Last 24 Hours</h3>
                <p className="text-4xl font-bold text-[#58a6ff]">{recentPastes.filter(paste => 
                  new Date(paste?.createdAt || 0) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                ).length}</p>
              </div>
              
              <div className="p-6 bg-[#161b22] rounded-lg border border-[#30363d] text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-400">Last Week</h3>
                <p className="text-4xl font-bold text-[#58a6ff]">{recentPastes.filter(paste => 
                  new Date(paste?.createdAt || 0) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}</p>
              </div>
              
              <div className="p-6 bg-[#161b22] rounded-lg border border-[#30363d] text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-400">Last Year</h3>
                <p className="text-4xl font-bold text-[#58a6ff]">{recentPastes.filter(paste => 
                  new Date(paste?.createdAt || 0) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
                ).length}</p>
              </div>
              
              <div className="p-6 bg-[#161b22] rounded-lg border border-[#30363d] text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-400">All Time</h3>
                <p className="text-4xl font-bold text-[#58a6ff]">{recentPastes.length}</p>
              </div>
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Link 
              href="/paste"
              className="px-6 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-white font-medium border border-[#30363d] transition-colors duration-200 inline-block"
            >
              Create New Paste
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
