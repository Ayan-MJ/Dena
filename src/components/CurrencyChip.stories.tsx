import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import CurrencyChip from './CurrencyChip';

const meta: Meta<typeof CurrencyChip> = {
  title: 'Components/CurrencyChip',
  component: CurrencyChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A currency chip component that displays a flag emoji and currency code. When primary is true, it shows an accent ring. Includes an accessible button with tooltip for setting primary currency.',
      },
    },
  },
  argTypes: {
    currency: {
      control: {
        type: 'select',
      },
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL', 'THB', 'SGD'],
      description: 'The currency code to display',
    },
    primary: {
      control: 'boolean',
      description: 'Whether this currency is the primary one (shows accent ring)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the chip',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    currency: 'USD',
    primary: false,
  },
};

// Primary currency
export const Primary: Story = {
  args: {
    currency: 'USD',
    primary: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency chip marked as primary with accent ring and indicator dot.',
      },
    },
  },
};

// Different currencies showcase
export const DifferentCurrencies: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <CurrencyChip currency="USD" />
      <CurrencyChip currency="EUR" primary />
      <CurrencyChip currency="GBP" />
      <CurrencyChip currency="JPY" />
      <CurrencyChip currency="THB" />
      <CurrencyChip currency="BRL" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different currency chips showcasing various flag emojis and one primary selection.',
      },
    },
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'THB', 'BRL'];
    const [primaryCurrency, setPrimaryCurrency] = useState('USD');
    
    const handleTogglePrimary = (currency: string) => {
      setPrimaryCurrency(currency);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click any currency to set it as primary:
        </div>
        <div className="flex flex-wrap gap-3">
          {currencies.map((currency) => (
            <CurrencyChip
              key={currency}
              currency={currency}
              primary={currency === primaryCurrency}
              onTogglePrimary={handleTogglePrimary}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Primary currency: <strong>{primaryCurrency}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example where clicking chips toggles the primary state. Only one currency can be primary at a time.',
      },
    },
  },
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    currency: 'EUR',
    primary: true,
    className: 'text-lg px-4 py-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency chip with custom styling applied via className prop.',
      },
    },
  },
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        These chips are fully accessible:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Keyboard navigable (Tab, Enter, Space)</li>
          <li>Screen reader friendly with proper ARIA labels</li>
          <li>Tooltip on hover/focus</li>
          <li>Visual focus indicators</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-3">
        <CurrencyChip currency="USD" primary aria-label="US Dollar, primary currency" />
        <CurrencyChip currency="EUR" aria-label="Euro" />
        <CurrencyChip currency="GBP" aria-label="British Pound" />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Try tabbing through the chips and using Enter/Space to interact
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of accessibility features including keyboard navigation and screen reader support.',
      },
    },
  },
}; 