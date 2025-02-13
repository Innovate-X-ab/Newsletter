import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-theme-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-subtle-grid bg-[size:30px_30px] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-theme-text-primary">
                <span className="block">Stay Updated with</span>
                <span className="bg-gradient-to-r from-theme-main to-theme-accent bg-clip-text text-transparent">
                  Atul&apos;s Newsletter
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-theme-text-secondary max-w-2xl mx-auto">
                Exploring technology, development, and innovation. 
                Join my journey through code and creativity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/newsletter"
                className="px-8 py-3 bg-theme-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>

              <Link
                href="/blog"
                className="px-8 py-3 bg-theme-surface border border-theme-border text-theme-text-primary rounded-lg hover:border-theme-main transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Read Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="relative bg-theme-darker py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-theme-main to-theme-accent bg-clip-text text-transparent">
              Latest Posts
            </h2>
            <p className="mt-4 text-theme-text-secondary">
              Explore my latest thoughts and insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="group bg-theme-surface rounded-lg overflow-hidden border border-theme-border hover:border-theme-main transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="h-48 mb-4 bg-theme-dark rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-theme-main/5 to-theme-accent/5"></div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-theme-main/10 text-theme-main rounded-full text-sm mb-4">
                    Technology
                  </span>
                  <h3 className="text-xl font-semibold text-theme-text-primary mb-2 group-hover:text-theme-main transition-colors">
                    Sample Blog Post {i}
                  </h3>
                  <p className="text-theme-text-secondary">
                    Exploring the latest developments in web technology and software engineering.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-theme-surface border border-theme-border rounded-lg text-theme-text-primary hover:border-theme-main transition-all duration-300"
            >
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}