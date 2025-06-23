'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Check, FileText, Eye, Key } from 'lucide-react';

interface BillNegotiationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BillNegotiationModal({ 
  open, 
  onClose, 
  onSuccess 
}: BillNegotiationModalProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

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

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setIsAuthorized(false);
    }
  }, [open]);

  const handleEnable = () => {
    if (!isAuthorized) return;
    
    console.log('billNegotiationEnabled');
    onSuccess();
    onClose();
  };

  const permissions = [
    {
      icon: Eye,
      title: "View your bills",
      description: "Access utility, internet, and subscription statements"
    },
    {
      icon: FileText,
      title: "Analyze spending patterns",
      description: "Review your payment history to identify savings opportunities"
    },
    {
      icon: Key,
      title: "Negotiate on your behalf",
      description: "Contact providers using OAuth tokens (no password sharing)"
    }
  ];

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
            className="relative w-full max-w-lg mx-auto"
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
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 id="modal-title" className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Lower Your Bills
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Let us negotiate better rates for you
                    </p>
                  </div>
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
                {/* Explainer text */}
                <div className="mb-6">
                  <p id="modal-description" className="text-slate-700 dark:text-slate-300 mb-4">
                    Save money effortlessly! Our bill negotiation service contacts your providers to secure better rates on utilities, internet, and subscriptions.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-green-100 dark:bg-green-900/40 rounded-full mt-0.5">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">
                          No savings, no fee
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          You only pay us if we successfully lower your bills. We keep things transparent with OAuth-only access—no password sharing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions list */}
                <div className="mb-6">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-4">
                    What we need permission for:
                  </h3>
                  <div className="space-y-3">
                    {permissions.map((permission, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <permission.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                            {permission.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authorization checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={isAuthorized}
                        onChange={(e) => setIsAuthorized(e.target.checked)}
                        className="sr-only"
                        ref={checkboxRef}
                        aria-describedby="authorization-text"
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                        isAuthorized 
                          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
                          : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-500'
                      }`}>
                        {isAuthorized && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                    <span 
                      id="authorization-text"
                      className="text-sm text-slate-700 dark:text-slate-300 select-none"
                    >
                      I authorize Denariq to negotiate on my behalf using secure OAuth access tokens. I understand that no passwords will be shared and I can revoke this permission at any time.
                    </span>
                  </label>
                </div>

                {/* Enable button */}
                <button
                  onClick={handleEnable}
                  disabled={!isAuthorized}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                    isAuthorized
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                  aria-describedby="enable-button-help"
                >
                  Enable Bill Negotiation
                </button>
                <p 
                  id="enable-button-help"
                  className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2"
                >
                  {!isAuthorized && "Please check the authorization box to enable"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 