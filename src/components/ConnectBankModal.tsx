'use client';

import { useEffect, useCallback, useRef } from 'react';
import { 
  usePlaidLink, 
  PlaidLinkOnSuccess, 
  PlaidLinkOnExit, 
  PlaidLinkOnEvent 
} from 'react-plaid-link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ConnectBankModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (publicToken: string) => void;
}

export default function ConnectBankModal({ 
  open, 
  onClose, 
  onSuccess 
}: ConnectBankModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Plaid Link configuration
  const config = {
    token: process.env.NEXT_PUBLIC_PLAID_LINK_TOKEN || 'link_sandbox_placeholder', // Use env var or placeholder
    onSuccess: useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
      console.log('Plaid Link Success:', { public_token, metadata });
      onSuccess(public_token);
      onClose();
    }, [onSuccess, onClose]),
    onExit: useCallback<PlaidLinkOnExit>((err, metadata) => {
      console.log('Plaid Link Exit:', { err, metadata });
      onClose();
    }, [onClose]),
    onEvent: useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
      console.log('Plaid Link Event:', { eventName, metadata });
    }, []),
  };

  const { open: openPlaid, ready } = usePlaidLink(config);

  // Auto-open Plaid when modal opens and link is ready
  useEffect(() => {
    if (open && ready) {
      openPlaid();
    }
  }, [open, ready, openPlaid]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Glassmorphic backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />
          
          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Glassmorphic dialog */}
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-slate-700/50">
                <div>
                  <h2 id="modal-title" className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Connect Your Bank
                  </h2>
                  <p id="modal-description" className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Securely link your bank account with Plaid
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close modal"
                  ref={closeButtonRef}
                >
                  <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!ready ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Initializing secure connection...
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      Connecting Your Bank
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Plaid Link is opening to securely connect your bank account. Follow the prompts in the Plaid window.
                    </p>
                    
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-pulse flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-4 text-center">
                      Your data is encrypted and secure. We never store your banking credentials.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 