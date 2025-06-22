import type { Meta, StoryObj } from '@storybook/react';
import SyncBadge from './SyncBadge';

const meta: Meta<typeof SyncBadge> = {
  title: 'Components/SyncBadge',
  component: SyncBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component to display sync status with appropriate icons and colors. The warning status includes a subtle pulse animation.',
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
};

// Error status
export const Error: Story = {
  args: {
    status: 'error',
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