"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Building2, Plus } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import ConnectBankModal from "@/components/ConnectBankModal";

// Temporary bypass flag - in production this would check authentication
const BYPASS_AUTH = true;

interface ConnectedBank {
  id: string;
  institutionName: string;
  publicToken: string;
  connectedAt: Date;
}

export default function ConnectBanksPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState<ConnectedBank[]>([]);

  // In production, check authentication here
  if (!BYPASS_AUTH) {
    // Redirect to login or show unauthorized
    return null;
  }

  const handleBankConnectSuccess = (publicToken: string) => {
    console.log('Bank connection successful! Public token:', publicToken);
    
    // Create a new connected bank entry
    const newBank: ConnectedBank = {
      id: Math.random().toString(36).substr(2, 9),
      institutionName: "Sandbox Institution", // In production, get from Plaid metadata
      publicToken,
      connectedAt: new Date(),
    };

    setConnectedBanks(prev => [...prev, newBank]);
    setIsConnectModalOpen(false);
  };

  const hasConnectedBanks = connectedBanks.length > 0;

  return (
    <BaseLayout>
      <div className="col-span-12">
        <div className="max-w-2xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Link your first account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Connect your bank account to start tracking your finances across all currencies.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Connected Banks List */}
            {hasConnectedBanks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Connected Accounts
                </h2>
                
                {connectedBanks.map((bank) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      {/* Success Icon */}
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      
                      {/* Bank Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {bank.institutionName}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Connected {bank.connectedAt.toLocaleDateString()} at {bank.connectedAt.toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                          Token: {bank.publicToken.substring(0, 20)}...
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Connect Bank Button */}
            <div className="text-center">
              {!hasConnectedBanks ? (
                <motion.button
                  onClick={() => setIsConnectModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Building2 className="w-6 h-6" />
                  Connect bank
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setIsConnectModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-slate-300 dark:border-slate-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  Connect another bank
                </motion.button>
              )}
            </div>

            {/* Help Text */}
            {!hasConnectedBanks && (
              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  We use bank-level encryption to keep your data secure. We never store your banking credentials.
                </p>
              </div>
            )}
          </div>
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