"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Check for existing dark mode preference
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        
        {/* Dark Mode Toggle */}
        <div className="row-start-1 w-full max-w-4xl flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <span className="text-lg">
              {isDark ? '☀️' : '🌙'}
            </span>
            <span className="text-sm font-medium">
              {isDark ? 'Light' : 'Dark'} Mode
            </span>
          </button>
        </div>

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          
          {/* Welcome Section */}
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Welcome to <span className="text-primary">Denariq</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              One wallet, every currency, zero headaches. Personal finance platform for freelancers, expats and remote workers.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-200">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-4">
                <span className="text-white text-xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Never-Break Sync
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Multi-provider account aggregation with auto-reconnect
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-200">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                <span className="text-white text-xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Multi-Currency
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Live exchange rates and unified net-worth tracking
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-200">
              <div className="w-10 h-10 rounded-lg bg-slate-600 dark:bg-slate-500 flex items-center justify-center mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                AI Smoothing
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Smart budgeting and tax buffers for variable earners
              </p>
            </div>
          </div>

          {/* Next.js Info */}
          <div className="mt-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-200 w-full max-w-2xl">
            <Image
              className="dark:invert mb-4"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={25}
              priority
            />
            <ol className="list-inside list-decimal text-sm text-slate-700 dark:text-slate-300 font-mono space-y-2">
              <li>
                Get started by editing{" "}
                <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded font-mono font-semibold text-xs">
                  src/app/page.tsx
                </code>
              </li>
              <li>
                Save and see your changes instantly with hot reload
              </li>
              <li>
                Toggle dark mode to test the theme switching
              </li>
            </ol>
          </div>

        </main>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-slate-500 dark:text-slate-400">
          <span className="text-sm">
            Built with Next.js 14 + Tailwind CSS + Inter Font
          </span>
        </footer>
      </div>
    </div>
  );
}
