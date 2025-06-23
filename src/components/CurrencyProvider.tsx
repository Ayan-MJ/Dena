"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyContextType {
  primaryCurrency: string;
  setPrimaryCurrency: (currency: string) => void;
  availableCurrencies: string[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

interface CurrencyProviderProps {
  children: ReactNode;
}

// Available currencies list (mock - in production this would come from API)
const AVAILABLE_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL', 
  'THB', 'SGD', 'KRW', 'MXN', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF'
];

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [primaryCurrency, setPrimaryCurrencyState] = useState('USD');
  const [mounted, setMounted] = useState(false);

  // Initialize currency on mount
  useEffect(() => {
    setMounted(true);
    
    // Check for existing currency preference
    const savedCurrency = localStorage.getItem('primaryCurrency');
    if (savedCurrency && AVAILABLE_CURRENCIES.includes(savedCurrency)) {
      setPrimaryCurrencyState(savedCurrency);
    }
  }, []);

  // Set primary currency with localStorage persistence
  const setPrimaryCurrency = (currency: string) => {
    if (AVAILABLE_CURRENCIES.includes(currency)) {
      setPrimaryCurrencyState(currency);
      localStorage.setItem('primaryCurrency', currency);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <CurrencyContext.Provider value={{
        primaryCurrency: 'USD',
        setPrimaryCurrency: () => {},
        availableCurrencies: AVAILABLE_CURRENCIES,
      }}>
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={{
      primaryCurrency,
      setPrimaryCurrency,
      availableCurrencies: AVAILABLE_CURRENCIES,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
} 