/**
 * Formats a monetary amount using Intl.NumberFormat
 * @param amount - The numerical amount to format
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'THB')  
 * @param locale - Optional locale string (defaults to 'en-US')
 * @returns Formatted money string (e.g., '$1,234.56', '€1.234,56', '฿1,234.56')
 */
export function formatMoney(
  amount: number, 
  currency: string, 
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback for invalid currency or locale
    console.warn(`Failed to format ${amount} ${currency} with locale ${locale}:`, error);
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Formats a monetary amount with custom options
 * @param amount - The numerical amount to format
 * @param currency - The currency code
 * @param options - Formatting options including locale and Intl.NumberFormat options
 * @returns Formatted money string
 */
export function formatMoneyAdvanced(
  amount: number,
  currency: string,
  options: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
    currencyDisplay?: 'symbol' | 'code' | 'name';
  } = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    useGrouping = true,
    currencyDisplay = 'symbol'
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
      currencyDisplay,
    }).format(amount);
  } catch (error) {
    console.warn(`Failed to format ${amount} ${currency} with advanced options:`, error);
    return `${currency} ${amount.toFixed(minimumFractionDigits)}`;
  }
}

// Hard-coded FX rates for demo purposes (in production, these would come from an API)
const FX_RATES: Record<string, number> = {
  USD: 1.0,     // Base currency
  EUR: 0.85,    // 1 USD = 0.85 EUR
  GBP: 0.73,    // 1 USD = 0.73 GBP
  JPY: 110.0,   // 1 USD = 110 JPY
  CAD: 1.25,    // 1 USD = 1.25 CAD
  AUD: 1.35,    // 1 USD = 1.35 AUD
  CHF: 0.92,    // 1 USD = 0.92 CHF
  CNY: 6.45,    // 1 USD = 6.45 CNY
  INR: 74.0,    // 1 USD = 74 INR
  BRL: 5.2,     // 1 USD = 5.2 BRL
  THB: 33.0,    // 1 USD = 33 THB
  SGD: 1.35,    // 1 USD = 1.35 SGD
  KRW: 1180.0,  // 1 USD = 1180 KRW
  MXN: 20.0,    // 1 USD = 20 MXN
  SEK: 8.5,     // 1 USD = 8.5 SEK
  NOK: 8.8,     // 1 USD = 8.8 NOK
  DKK: 6.3,     // 1 USD = 6.3 DKK
  PLN: 3.9,     // 1 USD = 3.9 PLN
  CZK: 21.5,    // 1 USD = 21.5 CZK
  HUF: 295.0,   // 1 USD = 295 HUF
};

/**
 * Converts amount from USD base to target currency using hard-coded rates
 * @param amountInUSD - Amount in USD (base currency)
 * @param targetCurrency - Target currency code
 * @returns Converted amount in target currency
 */
export function convertCurrency(amountInUSD: number, targetCurrency: string): number {
  const rate = FX_RATES[targetCurrency];
  if (!rate) {
    console.warn(`No FX rate found for ${targetCurrency}, returning USD amount`);
    return amountInUSD;
  }
  return amountInUSD * rate;
}

/**
 * Formats money with currency conversion from USD base
 * @param amountInUSD - Amount in USD (base currency)
 * @param targetCurrency - Target currency to convert to and format in
 * @param locale - Optional locale string
 * @returns Formatted money string in target currency
 */
export function formatMoneyWithConversion(
  amountInUSD: number,
  targetCurrency: string,
  locale: string = 'en-US'
): string {
  const convertedAmount = convertCurrency(amountInUSD, targetCurrency);
  return formatMoney(convertedAmount, targetCurrency, locale);
} 