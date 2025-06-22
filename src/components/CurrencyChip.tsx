"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CurrencyChipProps {
  currency: string;
  primary?: boolean;
  onTogglePrimary?: (currency: string) => void;
  className?: string;
}

// Currency to flag emoji mapping
const currencyFlags: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺", 
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
  INR: "🇮🇳",
  BRL: "🇧🇷",
  THB: "🇹🇭",
  SGD: "🇸🇬",
  KRW: "🇰🇷",
  MXN: "🇲🇽",
  SEK: "🇸🇪",
  NOK: "🇳🇴",
  DKK: "🇩🇰",
  PLN: "🇵🇱",
  CZK: "🇨🇿",
  HUF: "🇭🇺",
};

export default function CurrencyChip({ 
  currency, 
  primary = false, 
  onTogglePrimary,
  className = "" 
}: CurrencyChipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const flagEmoji = currencyFlags[currency] || "🏳️";

  const handleClick = () => {
    if (onTogglePrimary) {
      onTogglePrimary(currency);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
          text-sm font-medium transition-all duration-200
          bg-gray-100 dark:bg-gray-800 
          text-gray-800 dark:text-gray-200
          border-2 hover:bg-gray-200 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${primary 
            ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700'
          }
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`${currency} currency${primary ? ' (primary)' : ''}`}
        aria-pressed={primary}
        role="button"
      >
        <span className="text-base" aria-hidden="true">
          {flagEmoji}
        </span>
        <span className="font-mono text-sm font-semibold">
          {currency}
        </span>
        {primary && (
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.3 }}
            aria-hidden="true"
          />
        )}
      </motion.button>
      
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap z-10"
          role="tooltip"
        >
          Set primary currency
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </motion.div>
      )}
    </div>
  );
} 