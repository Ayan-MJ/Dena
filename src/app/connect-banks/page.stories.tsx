import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConnectBanksPage from './page';

const meta: Meta<typeof ConnectBanksPage> = {
  title: 'Pages/ConnectBanks',
  component: ConnectBanksPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The connect-banks page showing the initial state with no connected banks. Click "Connect bank" to open the Plaid Link modal.',
      },
    },
  },
};

export const WithMockData: Story = {
  render: () => {
    // This would show what the page looks like after connecting banks
    // In a real story, we might pre-populate with mock connected banks
    return <ConnectBanksPage />;
  },
  parameters: {
    docs: {
      description: {
        story: 'The connect-banks page in its default state. After successfully connecting a bank through Plaid Link, it will show the connected account with a green check icon.',
      },
    },
  },
}; 