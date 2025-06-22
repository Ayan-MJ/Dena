"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check for existing theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);

    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200 dark:border-slate-700"
      aria-label="Switch theme"
      title="Switch theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Switch theme
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
      </div>
    </button>
  );
} 