import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ConnectBankModal from './ConnectBankModal';

const meta: Meta<typeof ConnectBankModal> = {
  title: 'Components/ConnectBankModal',
  component: ConnectBankModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the modal is open',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback fired when the modal should close',
    },
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback fired when Plaid Link succeeds with public token',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveTemplate = (args: { onSuccess: (token: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Connect Bank Modal Demo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Click the button below to open the Connect Bank Modal with Plaid Link integration.
          This demo uses a sandbox placeholder token.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Open Connect Bank Modal
        </button>

        <ConnectBankModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={(publicToken) => {
            console.log('Success with token:', publicToken);
            args.onSuccess(publicToken);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveTemplate,
  args: {},
};

export const Open: Story = {
  args: {
    open: true,
    onClose: () => console.log('Modal closed'),
    onSuccess: (publicToken: string) => console.log('Success:', publicToken),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in open state showing the glassmorphic design and Plaid Link integration.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => console.log('Modal closed'),
    onSuccess: (publicToken: string) => console.log('Success:', publicToken),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in closed state (nothing visible).',
      },
    },
  },
}; 