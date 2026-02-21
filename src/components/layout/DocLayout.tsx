import React, { useState } from 'react';
import { Menu, X, Search, ExternalLink, Sparkles } from 'lucide-react';
import { Sidebar } from '../sidebar/Sidebar';
import logoImage from '../../assets/kiwiwhite.png';

interface DocLayoutProps {
  children: React.ReactNode;
}

export const DocLayout: React.FC<DocLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark mesh-bg">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-kiwi-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-highlight-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="glass-strong fixed w-full top-0 z-50 border-b border-white/5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 flex items-center">
                <img
                  src={logoImage}
                  alt="Kiwi Finance Logo"
                  className="w-[115px] object-cover"
                />
              </div>
              <div className="hidden md:flex items-center">
                <span className="h-6 w-px bg-white/10 mx-3" />
                <span className="text-sm font-medium text-white/60">Documentation</span>
              </div>
            </div>

            {/* Center - Search (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm">Search documentation...</span>
                <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-white/40 bg-white/5 rounded-md border border-white/10">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Version badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-kiwi-500/10 border border-kiwi-500/20">
                <Sparkles className="h-3.5 w-3.5 text-kiwi-400" />
                <span className="text-xs font-medium text-kiwi-400">v2.0</span>
              </div>

              {/* API Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kiwi-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-kiwi-500"></span>
                </span>
                <span className="text-xs font-medium text-white/70">API Online</span>
              </div>

              {/* Search button (Mobile) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-[20vh]">
            <div className="relative w-full max-w-xl glass-strong rounded-2xl p-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Search className="h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="py-8 text-center text-white/40 text-sm">
                Start typing to search...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 bottom-0 flex flex-col w-full max-w-xs sm:w-80 bg-dark-100/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <img
              src={logoImage}
              alt="Kiwi Finance Logo"
              className="h-7 w-auto object-contain"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 z-20">
        <div className="flex flex-col w-72 bg-dark-100/50 backdrop-blur-xl border-r border-white/5 pt-16">
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-white/5">
            <a
              href="https://kiwifinance.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-kiwi-500 to-accent-500 text-white font-medium text-sm hover:shadow-glow transition-all duration-300"
            >
              <span>Go to Dashboard</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 pt-16 relative z-10">
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
