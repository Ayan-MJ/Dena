"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Plus, Building2, DollarSign, Rocket } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import SyncBadge from "@/components/SyncBadge";
import ConnectBankModal from "@/components/ConnectBankModal";
import BillNegotiationModal from "@/components/BillNegotiationModal";
import CashFlowChart from "@/components/CashFlowChart";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatMoneyWithConversion } from "@/lib/formatMoney";
import { useNotify } from "@/lib/useNotify";

// Force dynamic rendering to prevent prerendering issues with useSearchParams
export const dynamic = 'force-dynamic';

// Temporary bypass flag - in production this would check authentication
const BYPASS_AUTH = true;

// Mock data - in production this would come from API
const MOCK_NET_WORTH_USD = 12450.30;
const MOCK_MONTHLY_CHANGE_USD = 1200.0;

function DashboardContent() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isBillNegotiationModalOpen, setIsBillNegotiationModalOpen] = useState(false);
  const [billNegotiationEnabled, setBillNegotiationEnabled] = useState(false);
  const { primaryCurrency } = useCurrency();
  const searchParams = useSearchParams();
  const { success } = useNotify();

  // Check for importSuccess parameter and show toast
  useEffect(() => {
    if (searchParams.get('importSuccess') === '1') {
      success('Transactions imported!');
    }
  }, [searchParams, success]);

  // In production, check authentication here
  if (!BYPASS_AUTH) {
    // Redirect to login or show unauthorized
    return null;
  }

  const handleBankConnectSuccess = (publicToken: string) => {
    console.log('Bank connection successful! Public token:', publicToken);
    // In production, this would send the token to your backend
  };

  const handleBillNegotiationSuccess = () => {
    setBillNegotiationEnabled(true);
    success('Bill negotiation enabled! We&apos;ll start working on lowering your bills.');
  };

  // Format net worth and monthly change in selected currency
  const formattedNetWorth = formatMoneyWithConversion(MOCK_NET_WORTH_USD, primaryCurrency);
  const formattedMonthlyChange = formatMoneyWithConversion(MOCK_MONTHLY_CHANGE_USD, primaryCurrency);

  return (
    <BaseLayout>
      <div className="col-span-12">
        {/* Navigation Links */}
        <div className="mb-6 flex gap-4">
          <motion.button
            onClick={() => setIsConnectModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Connect Bank (Modal)
          </motion.button>
          
          <motion.a
            href="/connect-banks"
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-slate-300 dark:border-slate-600 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Building2 className="w-5 h-5" />
            Connect Banks Page
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Net-worth Summary Card */}
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Net Worth
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {formattedNetWorth}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  +{formattedMonthlyChange} this month
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          {/* Cash Flow Chart */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <CashFlowChart />
          </motion.div>

          {/* Lower Bills Card */}
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {!billNegotiationEnabled ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Lower my bills
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                    Save money on utilities & subscriptions
                  </p>
                  <button
                    onClick={() => setIsBillNegotiationModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </button>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  We&apos;re working on it! 🚀
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Our team is negotiating better rates for your bills. We&apos;ll notify you when we find savings.
                </p>
              </div>
            )}
          </motion.div>

          {/* Sync Health Status Card */}
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Sync Health
                </h3>
                <div className="mt-2">
                  <SyncBadge status="healthy" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Last sync: 2 minutes ago
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connect Bank Modal */}
        <ConnectBankModal 
          open={isConnectModalOpen}
          onClose={() => setIsConnectModalOpen(false)}
          onSuccess={handleBankConnectSuccess}
        />

        {/* Bill Negotiation Modal */}
        <BillNegotiationModal 
          open={isBillNegotiationModalOpen}
          onClose={() => setIsBillNegotiationModalOpen(false)}
          onSuccess={handleBillNegotiationSuccess}
        />
      </div>
    </BaseLayout>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
} 