'use client';

import {useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function ApiDocs() {
  useEffect(() => {
    // Add background animation
    document.body.classList.add('bg-animate');
    return () => {
      document.body.classList.remove('bg-animate');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <motion.header 
        className="bg-[#161b22] border-b border-[#30363d] py-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-[#58a6ff]">Void</span>Bin
              </Link>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/paste" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Create Paste
                  </Link>
                </li>
                <li>
                  <span className="text-white font-medium">API Docs</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
          <p className="text-gray-400 text-lg mb-12 max-w-3xl">
            VoidBin provides a simple RESTful API that allows you to programmatically create pastes.
            Note that for security reasons, only the POST endpoint for creating pastes is publicly available.
            Retrieval of pastes is restricted to the VoidBin website interface only.
          </p>
        </motion.div>

        {/* Endpoints */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Create Paste Endpoint */}
          <section className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#30363d] flex items-center">
              <span className="text-[#1f6feb] font-mono font-bold mr-3">POST</span>
              <h2 className="text-xl font-bold">Create a Paste</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-6">
                Creates a new paste with the provided content, optional title, and language.
              </p>
              
              <h3 className="text-lg font-medium mb-3">Endpoint</h3>
              <div className="bg-[#0d1117] p-3 rounded font-mono mb-6">
                /api/paste
              </div>
              
              <h3 className="text-lg font-medium mb-3">Request Body</h3>
              <div className="bg-[#0d1117] p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
                {`{
  "content": "console.log('Hello, World!');",  // Required: The content of the paste
  "language": "javascript",                     // Optional: The language for syntax highlighting (defaults to plaintext)
  "title": "My First Paste"                     // Optional: A title for the paste
}`}
              </div>
              
              <h3 className="text-lg font-medium mb-3">Response (201 Created)</h3>
              <div className="bg-[#0d1117] p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
                {`{
  "id": "abc123"  // The unique ID of the created paste
}`}
              </div>
              
              <h3 className="text-lg font-medium mb-3">Example</h3>
              <div className="bg-[#0d1117] p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
                {`fetch('/api/paste', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'console.log("Hello, World!");',
    language: 'javascript',
    title: 'My First Paste'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
              </div>
              
              <h3 className="text-lg font-medium mb-3">Rate Limits</h3>
              <p className="text-gray-400">
                A maximum of 5000 pastes can be created per hour from a single IP address.
              </p>
            </div>
          </section>
          
          {/* Access Note Section */}
          <section className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#30363d] flex items-center">
              <span className="text-[#f85149] font-mono font-bold mr-3">NOTE</span>
              <h2 className="text-xl font-bold">API Access Restrictions</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-6">
                For security and privacy reasons, VoidBin does not provide public API access for retrieving paste content.
                The following operations are restricted to the VoidBin website interface only:
              </p>
              
              <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                <li>Retrieving paste content (GET /api/paste/[id])</li>
                <li>Listing recent pastes (GET /api/paste)</li>
              </ul>
              
              <p className="text-gray-400 mb-6">
                These restrictions help prevent automated scraping and maintain the privacy of paste content.
                If you need to access paste content programmatically for legitimate purposes, please contact us to discuss your use case.
              </p>
              
              <div className="bg-[#0d1117] p-4 rounded border border-[#f85149] text-sm mb-6">
                <p className="text-[#f85149] font-medium mb-2">⚠️ Important</p>
                <p className="text-gray-400">
                  Attempts to access these restricted endpoints programmatically may result in your IP address being temporarily blocked.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
        
        {/* Back to app section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-400 mb-6">Ready to create your first paste?</p>
          <Link 
            href="/paste" 
            className="px-8 py-3 bg-[#1f6feb] hover:bg-[#388bfd] rounded-md text-white font-medium transition-colors duration-200 inline-block"
          >
            Create New Paste
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 