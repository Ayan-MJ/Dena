import { render, screen, fireEvent } from '@testing-library/react';
import ConnectBankModal from '../ConnectBankModal';

// Mock react-plaid-link
jest.mock('react-plaid-link', () => ({
  usePlaidLink: () => ({
    open: jest.fn(),
    ready: true,
  }),
}));

describe('ConnectBankModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open is true', () => {
    render(
      <ConnectBankModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Connect Your Bank')).toBeInTheDocument();
    expect(screen.getByText('Securely link your bank account with Plaid')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <ConnectBankModal
        open={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByText('Connect Your Bank')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ConnectBankModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <ConnectBankModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const backdrop = screen.getByText('Connect Your Bank').closest('[role="dialog"]')?.parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('shows ready state when Plaid Link is ready', () => {
    render(
      <ConnectBankModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Connecting Your Bank')).toBeInTheDocument();
    expect(screen.getByText('Plaid Link is opening to securely connect your bank account. Follow the prompts in the Plaid window.')).toBeInTheDocument();
  });
}); 