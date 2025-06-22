import { render } from '@testing-library/react';
import CashFlowChart from '../CashFlowChart';

// Sample test data
const sampleData = [
  { date: 'Jan 1', income: 1500, expenses: 1200 },
  { date: 'Jan 2', income: 1800, expenses: 1000 },
  { date: 'Jan 3', income: 1200, expenses: 1400 },
  { date: 'Jan 4', income: 2000, expenses: 1100 },
  { date: 'Jan 5', income: 1600, expenses: 1300 },
];

describe('CashFlowChart', () => {
  it('renders CashFlowChart with sample data', () => {
    const { container } = render(<CashFlowChart data={sampleData} />);
    
    // Check that the component renders
    expect(container.firstChild).toBeInTheDocument();
    
    // Check for the card wrapper structure
    const cardElement = container.querySelector('.bg-white');
    expect(cardElement).toBeInTheDocument();
  });

  it('renders with default mock data when no data prop is provided', () => {
    const { container } = render(<CashFlowChart />);
    
    // Check that the component renders
    expect(container.firstChild).toBeInTheDocument();
    
    // Check for the card wrapper structure
    const cardElement = container.querySelector('.bg-white');
    expect(cardElement).toBeInTheDocument();
  });

  it('displays the correct title and subtitle', () => {
    const { getByText } = render(<CashFlowChart data={sampleData} />);
    
    expect(getByText('Cash Flow')).toBeInTheDocument();
    expect(getByText('Last 90 days')).toBeInTheDocument();
  });

  it('displays legend with Income and Expenses labels', () => {
    const { getByText } = render(<CashFlowChart data={sampleData} />);
    
    expect(getByText('Income')).toBeInTheDocument();
    expect(getByText('Expenses')).toBeInTheDocument();
  });
}); 