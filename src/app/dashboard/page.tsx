"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, Shield } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import SyncBadge from "@/components/SyncBadge";

// Temporary bypass flag - in production this would check authentication
const BYPASS_AUTH = true;

export default function Dashboard() {
  // In production, check authentication here
  if (!BYPASS_AUTH) {
    // Redirect to login or show unauthorized
    return null;
  }

  return (
    <BaseLayout>
      <div className="col-span-12">
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

          {/* Cash-flow Graph Placeholder Card */}
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Cash Flow
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Last 30 days
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-md flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Graph placeholder
              </p>
            </div>
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
      </div>
    </BaseLayout>
  );
} 