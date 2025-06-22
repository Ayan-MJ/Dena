import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
(global as any).localStorage = localStorageMock;

// Mock matchMedia
const mockMatchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the dark class from document element
    document.documentElement.classList.remove('dark');
    // Reset matchMedia mock
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('renders the theme toggle button', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /switch theme/i })).toBeInTheDocument();
    });
  });

  it('toggles between light and dark mode', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ThemeToggle />);
    
    const toggleButton = await waitFor(() => 
      screen.getByRole('button', { name: /switch theme/i })
    );

    // Should start in light mode
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    // Click to toggle to dark mode
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    // Click again to toggle back to light mode
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });

  it('loads saved theme preference from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('respects system preference when no saved preference exists', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    // Mock system preference for dark mode
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('has correct accessibility attributes', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ThemeToggle />);
    
    const toggleButton = await waitFor(() => 
      screen.getByRole('button', { name: /switch theme/i })
    );

    expect(toggleButton).toHaveAttribute('aria-label', 'Switch theme');
    expect(toggleButton).toHaveAttribute('title', 'Switch theme');
  });
}); 