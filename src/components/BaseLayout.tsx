"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import CurrencySelector from "./CurrencySelector";
import { CurrencyProvider } from "./CurrencyProvider";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-slate-900" />;
  }

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        {/* Sticky Navbar */}
        <motion.nav 
          className="sticky top-0 z-50 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-full px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Denariq
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <CurrencySelector />
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>

        {/* Main Content Area with 12-column Grid */}
        <main className="grid grid-cols-12 gap-6 px-6 py-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </CurrencyProvider>
  );
} 