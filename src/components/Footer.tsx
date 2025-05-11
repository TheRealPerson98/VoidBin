import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };
  
  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, transition: { duration: 0.3 } }
  };
  
  return (
    <footer className="py-12 bg-black border-t border-zinc-800 relative overflow-hidden">
      {/* Animated background element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnYtNmgtNnY2aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Logo and tagline section */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                <span className="text-cyan-500">Void</span>Bin
              </h2>
              <p className="text-zinc-400 text-sm">A modern pastebin service</p>
              <p className="text-zinc-500 text-xs mt-1">Person98 LLC</p>
            </motion.div>
            
            {/* Main navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-8"
            >
              {[
                { href: "/docs", label: "API Docs" },
                { href: "/paste", label: "New Paste" },
                { href: "/paste/text", label: "Just Text" }
              ].map((link) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  onHoverStart={() => setHoveredLink(link.href)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <Link href={link.href} className="group relative">
                    <span className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider font-medium">
                      {link.label}
                    </span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 ${hoveredLink === link.href ? 'w-full' : 'w-0'}`}></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Separator with unique design */}
          <div className="relative flex py-5 items-center mb-8">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>
          
          {/* Open source section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-10"
          >
            <p className="text-zinc-300 text-sm mb-6 font-light">This project is open source</p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { 
                  href: "https://github.com/thejacedev/VoidBin", 
                  label: "VoidBin Repository",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  )
                },
                { 
                  href: "https://github.com/thejacedev/", 
                  label: "GitHub Profile",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  )
                }
              ].map((link) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors duration-300"
                  >
                    <motion.div variants={iconVariants} className="text-cyan-500">
                      {link.icon}
                    </motion.div>
                    <span className="text-zinc-300 text-sm">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            {[
              { 
                href: "https://x.com/MainPerson98", 
                label: "Twitter",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                )
              },
              { 
                href: "https://bsky.app/profile/person98llc.bsky.social", 
                label: "Bluesky",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                )
              },
              { 
                href: "https://www.linkedin.com/in/jace-sleeman-b65ab0205/", 
                label: "LinkedIn",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                )
              }
            ].map((link) => (
              <motion.div
                key={link.href}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-cyan-800 transition-colors duration-300"
                >
                  <motion.div variants={iconVariants} className="text-zinc-400 hover:text-cyan-500 transition-colors duration-300">
                    {link.icon}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-zinc-600 text-xs">&copy; {new Date().getFullYear()} Person98 LLC. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 