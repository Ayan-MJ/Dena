import { formatMoney, formatMoneyAdvanced } from '../formatMoney';

// Helper function to get actual formatted values for comparison
const getFormattedValue = (amount: number, currency: string, locale?: string) => {
  return formatMoney(amount, currency, locale);
};

describe('formatMoney', () => {
  describe('USD formatting', () => {
    test('formats USD with default locale', () => {
      expect(formatMoney(1234.56, 'USD')).toBe('$1,234.56');
      expect(formatMoney(0, 'USD')).toBe('$0.00');
      expect(formatMoney(0.99, 'USD')).toBe('$0.99');
      expect(formatMoney(1000000, 'USD')).toBe('$1,000,000.00');
    });

    test('formats USD with specific locale', () => {
      expect(formatMoney(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
      // Test with actual formatted value
      const germanUSD = formatMoney(1234.56, 'USD', 'de-DE');
      expect(germanUSD).toContain('1.234,56');
      expect(germanUSD).toContain('$');
    });

    test('handles negative USD amounts', () => {
      expect(formatMoney(-1234.56, 'USD')).toBe('-$1,234.56');
      expect(formatMoney(-0.01, 'USD')).toBe('-$0.01');
    });
  });

  describe('EUR formatting', () => {
    test('formats EUR with default locale', () => {
      expect(formatMoney(1234.56, 'EUR')).toBe('€1,234.56');
      expect(formatMoney(0, 'EUR')).toBe('€0.00');
      expect(formatMoney(999.99, 'EUR')).toBe('€999.99');
    });

    test('formats EUR with European locale', () => {
      const germanEUR = formatMoney(1234.56, 'EUR', 'de-DE');
      expect(germanEUR).toContain('1.234,56');
      expect(germanEUR).toContain('€');
      
      const frenchEUR = formatMoney(1234.56, 'EUR', 'fr-FR');
      expect(frenchEUR).toContain('234,56');
      expect(frenchEUR).toContain('€');
    });

    test('handles negative EUR amounts', () => {
      expect(formatMoney(-1234.56, 'EUR')).toBe('-€1,234.56');
    });
  });

  describe('THB formatting', () => {
    test('formats THB with default locale', () => {
      const result1 = formatMoney(1234.56, 'THB');
      expect(result1).toMatch(/THB.*1,234\.56/);
      
      const result2 = formatMoney(0, 'THB');
      expect(result2).toMatch(/THB.*0\.00/);
      
      const result3 = formatMoney(50000, 'THB');
      expect(result3).toMatch(/THB.*50,000\.00/);
    });

    test('formats THB with Thai locale', () => {
      const thaiTHB = formatMoney(1234.56, 'THB', 'th-TH');
      expect(thaiTHB).toContain('1,234.56');
      expect(thaiTHB).toContain('฿');
    });

    test('handles negative THB amounts', () => {
      const result = formatMoney(-1234.56, 'THB');
      expect(result).toMatch(/-THB.*1,234\.56/);
    });
  });

  describe('edge cases', () => {
    test('handles very large numbers', () => {
      expect(formatMoney(1234567890.12, 'USD')).toBe('$1,234,567,890.12');
    });

    test('handles very small numbers', () => {
      expect(formatMoney(0.01, 'USD')).toBe('$0.01');
      expect(formatMoney(0.001, 'USD')).toBe('$0.00'); // Rounds to 2 decimal places
    });

    test('handles zero', () => {
      expect(formatMoney(0, 'USD')).toBe('$0.00');
      expect(formatMoney(-0, 'USD')).toBe('-$0.00');
    });

    test('handles invalid currency gracefully', () => {
      const result = formatMoney(100, 'INVALID');
      expect(result).toBe('INVALID 100.00'); // Fallback format
    });

    test('handles invalid locale gracefully', () => {
      // This might not throw an error depending on the browser/Node.js version
      // but should either work or fallback gracefully
      const result = formatMoney(100, 'USD', 'invalid-locale');
      expect(typeof result).toBe('string');
      expect(result.includes('100')).toBe(true);
    });

    test('handles decimal precision correctly', () => {
      expect(formatMoney(1.1, 'USD')).toBe('$1.10');
      expect(formatMoney(1.999, 'USD')).toBe('$2.00'); // Rounds up
      expect(formatMoney(1.001, 'USD')).toBe('$1.00'); // Rounds down
    });
  });
});

describe('formatMoneyAdvanced', () => {
  test('uses custom fraction digits', () => {
    expect(formatMoneyAdvanced(1234.5678, 'USD', { 
      minimumFractionDigits: 4, 
      maximumFractionDigits: 4 
    })).toBe('$1,234.5678');
  });

  test('disables grouping', () => {
    expect(formatMoneyAdvanced(1234.56, 'USD', { 
      useGrouping: false 
    })).toBe('$1234.56');
  });

  test('uses currency code display', () => {
    const result = formatMoneyAdvanced(1234.56, 'USD', { 
      currencyDisplay: 'code' 
    });
    expect(result).toContain('USD');
    expect(result).toContain('1,234.56');
  });

  test('combines multiple options', () => {
    const result = formatMoneyAdvanced(1234.5678, 'EUR', {
      locale: 'de-DE',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      currencyDisplay: 'code'
    });
    expect(result).toContain('EUR');
    expect(result).toContain('1.234,568');
  });

  test('handles invalid options gracefully', () => {
    const result = formatMoneyAdvanced(100, 'INVALID', { locale: 'invalid' });
    expect(result).toBe('INVALID 100.00'); // Fallback format
  });
}); 