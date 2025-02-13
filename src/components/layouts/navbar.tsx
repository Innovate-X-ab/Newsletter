"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Add a spacer div to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
      
      <nav className="fixed top-0 left-0 right-0 bg-dark/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="font-heading text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all">
                Atul&apos;s Blog
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                href="/blog" 
                className={`relative py-2 text-sm font-mono transition-colors ${
                  pathname === '/blog' 
                    ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500' 
                    : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                Blog
              </Link>
              <Link 
                href="/newsletter" 
                className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-300 ${
                  pathname === '/newsletter' 
                    ? 'border-blue-500 text-blue-500 bg-blue-500/10'
                    : 'border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}