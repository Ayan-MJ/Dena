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