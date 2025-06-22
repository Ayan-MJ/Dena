"use client";

import { useState, useEffect } from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode on mount
  useEffect(() => {
    setMounted(true);
    
    // Check for existing dark mode preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedMode === 'true' || (savedMode === null && prefersDark);

    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-slate-900" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Denariq
            </h1>
          </div>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200 dark:border-slate-700"
          >
            <span className="text-sm">
              {isDark ? '☀️' : '🌙'}
            </span>
            <span className="text-sm font-medium hidden sm:inline">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area with 12-column Grid */}
      <main className="grid grid-cols-12 gap-6 px-6 py-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
} 