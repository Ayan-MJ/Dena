import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import BillNegotiationModal from './BillNegotiationModal';

const meta: Meta<typeof BillNegotiationModal> = {
  title: 'Components/BillNegotiationModal',
  component: BillNegotiationModal,
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
      description: 'Callback fired when the modal is closed',
    },
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback fired when bill negotiation is successfully enabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveTemplate = (args: { onSuccess: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Bill Negotiation Modal Demo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Click the button below to open the Bill Negotiation Modal.
          The modal requires authorization checkbox to be checked before enabling.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Open Bill Negotiation Modal
        </button>

        <BillNegotiationModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            console.log('Bill negotiation enabled!');
            args.onSuccess();
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
    onSuccess: () => console.log('Bill negotiation enabled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in open state showing the glassmorphic design and bill negotiation opt-in flow.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => console.log('Modal closed'),
    onSuccess: () => console.log('Bill negotiation enabled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in closed state (nothing visible).',
      },
    },
  },
}; 