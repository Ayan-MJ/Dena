"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface CashFlowData {
  date: string;
  income: number;
  expenses: number;
}

interface CashFlowChartProps {
  data?: CashFlowData[];
}

// Mock data for the last 90 days
const generateMockData = (): CashFlowData[] => {
  const data: CashFlowData[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic mock data with some variation
    const baseIncome = 1200 + Math.random() * 800; // $1200-2000 range
    const baseExpenses = 800 + Math.random() * 600; // $800-1400 range
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      income: Math.round(baseIncome),
      expenses: Math.round(baseExpenses),
    });
  }
  
  return data;
};

const defaultData = generateMockData();

export default function CashFlowChart({ data = defaultData }: CashFlowChartProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Cash Flow
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last 90 days
          </p>
        </div>
      </div>
      
      <div className="w-full" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              className="text-xs text-slate-500 dark:text-slate-400"
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs text-slate-500 dark:text-slate-400"
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Expenses</span>
        </div>
      </div>
    </div>
  );
} 