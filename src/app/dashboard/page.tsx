"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Shield, Plus, Building2 } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import SyncBadge from "@/components/SyncBadge";
import ConnectBankModal from "@/components/ConnectBankModal";
import CashFlowChart from "@/components/CashFlowChart";

// Temporary bypass flag - in production this would check authentication
const BYPASS_AUTH = true;

export default function Dashboard() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // In production, check authentication here
  if (!BYPASS_AUTH) {
    // Redirect to login or show unauthorized
    return null;
  }

  const handleBankConnectSuccess = (publicToken: string) => {
    console.log('Bank connection successful! Public token:', publicToken);
    // In production, this would send the token to your backend
  };

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

        <div className="grid md:grid-cols-3 gap-6">
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
                  $12,450.30
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  +$1,200 this month
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
      </div>
    </BaseLayout>
  );
} 