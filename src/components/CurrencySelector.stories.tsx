import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CurrencySelector from './CurrencySelector';
import { CurrencyProvider } from './CurrencyProvider';

const meta: Meta<typeof CurrencySelector> = {
  title: 'Components/CurrencySelector',
  component: CurrencySelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A currency selector component that opens a radial popover with currency options. Supports localStorage persistence and provides flag emojis for visual identification. Must be used within a CurrencyProvider.',
      },
    },
  },
  decorators: [
    (Story) => (
      <CurrencyProvider>
        <div className="p-8">
          <Story />
        </div>
      </CurrencyProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CurrencySelector>;

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default currency selector showing USD as the initial currency with flag emoji and dropdown functionality.',
      },
    },
  },
};

// With dark theme
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Currency selector in dark theme mode.',
      },
    },
  },
  decorators: [
    (Story) => (
      <CurrencyProvider>
        <div className="dark p-8 bg-slate-900">
          <Story />
        </div>
      </CurrencyProvider>
    ),
  ],
};

// In navbar context
export const InNavbar: Story = {
  render: () => (
    <CurrencyProvider>
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Denariq
          </h1>
          <div className="flex items-center gap-3">
            <CurrencySelector />
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
              Theme
            </button>
          </div>
        </div>
      </nav>
    </CurrencyProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Currency selector integrated into a navbar context, showing how it appears next to other controls.',
      },
    },
  },
}; 