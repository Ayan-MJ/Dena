"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useCurrency } from "./CurrencyProvider";

// Currency to flag emoji mapping (same as CurrencyChip)
const currencyFlags: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CAD: "🇨🇦", AUD: "🇦🇺",
  CHF: "🇨🇭", CNY: "🇨🇳", INR: "🇮🇳", BRL: "🇧🇷", THB: "🇹🇭", SGD: "🇸🇬",
  KRW: "🇰🇷", MXN: "🇲🇽", SEK: "🇸🇪", NOK: "🇳🇴", DKK: "🇩🇰", PLN: "🇵🇱",
  CZK: "🇨🇿", HUF: "🇭🇺",
};

export default function CurrencySelector() {
  const { primaryCurrency, setPrimaryCurrency, availableCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
    );
  }

  const flagEmoji = currencyFlags[primaryCurrency] || "🌍";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="relative group p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2"
        aria-label={`Select currency (current: ${primaryCurrency})`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{flagEmoji}</span>
        <span className="font-mono text-sm font-semibold">{primaryCurrency}</span>
        <Globe className="w-4 h-4 opacity-60" />
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Select currency
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
        </div>
      </button>

      {/* Radial Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-4"
            role="listbox"
            aria-label="Currency selection"
          >
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
              Select Primary Currency
            </div>
            
            {/* Currency Grid */}
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {availableCurrencies.map((currency) => {
                const isSelected = currency === primaryCurrency;
                const flag = currencyFlags[currency] || "🏳️";
                
                return (
                  <motion.button
                    key={currency}
                    onClick={() => {
                      setPrimaryCurrency(currency);
                      setIsOpen(false);
                    }}
                    className={`
                      flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200
                      hover:bg-slate-100 dark:hover:bg-slate-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${isSelected 
                        ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-offset-0' 
                        : 'bg-slate-50 dark:bg-slate-900'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="text-lg" aria-hidden="true">{flag}</span>
                    <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {currency}
                    </span>
                    {isSelected && (
                      <motion.div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 