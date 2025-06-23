import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SyncBadge from './SyncBadge';
import { Toaster } from 'react-hot-toast';

const meta: Meta<typeof SyncBadge> = {
  title: 'Components/SyncBadge',
  component: SyncBadge,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster position="top-right" />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (url: string) => {
          console.log('Navigation to:', url);
          alert(`Would navigate to: ${url}`);
        },
      },
    },
    docs: {
      description: {
        component: 'A badge component to display sync status with appropriate icons and colors. The warning status includes a subtle pulse animation. Warning and error states automatically trigger toast notifications and are clickable to navigate to reconnect page.',
      },
    },
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
      options: ['healthy', 'warning', 'error'],
      description: 'The sync status to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the badge',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing healthy status
export const Healthy: Story = {
  args: {
    status: 'healthy',
  },
};

// Warning status with pulse animation
export const Warning: Story = {
  args: {
    status: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning status triggers a toast notification and becomes clickable to navigate to reconnect page.',
      },
    },
  },
};

// Error status
export const Error: Story = {
  args: {
    status: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error status triggers a toast notification and becomes clickable to navigate to reconnect page.',
      },
    },
  },
};

// All variants showcased together
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SyncBadge status="healthy" />
      <SyncBadge status="warning" />
      <SyncBadge status="error" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge variants displayed together for comparison.',
      },
    },
  },
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    status: 'healthy',
    className: 'text-lg px-4 py-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with custom styling applied via className prop.',
      },
    },
  },
}; 