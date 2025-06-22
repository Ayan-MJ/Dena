import { formatMoney, formatMoneyAdvanced, convertCurrency, formatMoneyWithConversion } from '../formatMoney';

// Helper function to get actual formatted values for comparison
// const getFormattedValue = (amount: number, currency: string, locale?: string) => {
//   return formatMoney(amount, currency, locale);
// };

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

  it('formats USD correctly', () => {
    expect(formatMoney(1234.56, 'USD')).toBe('$1,234.56');
  });

  it('formats EUR correctly', () => {
    expect(formatMoney(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('formats JPY correctly', () => {
    expect(formatMoney(1234, 'JPY')).toBe('¥1,234.00');
  });

  it('handles invalid currency gracefully', () => {
    expect(formatMoney(1234.56, 'INVALID')).toBe('INVALID 1234.56');
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

  it('formats with custom options', () => {
    const result = formatMoneyAdvanced(1234.56, 'USD', {
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    // Just check that it contains the expected elements - exact format might vary by system
    expect(result).toContain('USD');
    expect(result).toContain('1,235');
  });
});

describe('convertCurrency', () => {
  it('converts USD to EUR correctly', () => {
    const result = convertCurrency(100, 'EUR');
    expect(result).toBe(85); // 100 * 0.85
  });

  it('converts USD to JPY correctly', () => {
    const result = convertCurrency(100, 'JPY');
    expect(result).toBe(11000); // 100 * 110
  });

  it('returns USD amount for USD', () => {
    const result = convertCurrency(100, 'USD');
    expect(result).toBe(100); // 100 * 1.0
  });

  it('handles invalid currency gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const result = convertCurrency(100, 'INVALID');
    expect(result).toBe(100);
    expect(consoleSpy).toHaveBeenCalledWith('No FX rate found for INVALID, returning USD amount');
    consoleSpy.mockRestore();
  });
});

describe('formatMoneyWithConversion', () => {
  it('converts and formats USD to EUR', () => {
    const result = formatMoneyWithConversion(100, 'EUR');
    expect(result).toBe('€85.00'); // 100 * 0.85 formatted as EUR
  });

  it('converts and formats USD to THB', () => {
    const result = formatMoneyWithConversion(100, 'THB');
    // THB might format differently on different systems, so just check conversion worked
    expect(result).toContain('3,300');
    expect(result.toLowerCase()).toContain('thb');
  });

  it('handles USD to USD conversion', () => {
    const result = formatMoneyWithConversion(100, 'USD');
    expect(result).toBe('$100.00');
  });
}); 