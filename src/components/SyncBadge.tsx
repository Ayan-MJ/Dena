"use client";

import { Check, AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotify } from "@/lib/useNotify";

interface SyncBadgeProps {
  status: 'healthy' | 'warning' | 'error';
  className?: string;
}

export default function SyncBadge({ status, className = "" }: SyncBadgeProps) {
  const router = useRouter();
  const { error } = useNotify();

  // Fire toast when status switches to warning or error
  useEffect(() => {
    if (status === 'warning' || status === 'error') {
      error('Bank connection lost – click to relink');
    }
  }, [status, error]);

  const handleClick = () => {
    if (status === 'warning' || status === 'error') {
      router.push('/connect-banks');
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          icon: Check,
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          textColor: 'text-green-800 dark:text-green-300',
          iconColor: 'text-green-500',
          border: 'border-green-200 dark:border-green-800',
          pulse: false
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          textColor: 'text-yellow-800 dark:text-yellow-300',
          iconColor: 'text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-800',
          pulse: true
        };
      case 'error':
        return {
          icon: X,
          bgColor: 'bg-rose-100 dark:bg-rose-900/20',
          textColor: 'text-rose-800 dark:text-rose-300',
          iconColor: 'text-rose-500',
          border: 'border-rose-200 dark:border-rose-800',
          pulse: false
        };
      default:
        return {
          icon: Check,
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          textColor: 'text-gray-800 dark:text-gray-300',
          iconColor: 'text-gray-500',
          border: 'border-gray-200 dark:border-gray-800',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${config.bgColor} ${config.textColor} ${config.border} ${className} ${
        (status === 'warning' || status === 'error') ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
      }`}
      animate={config.pulse ? { opacity: [1, 0.7, 1] } : {}}
      transition={config.pulse ? { duration: 2, repeat: Infinity } : {}}
      onClick={handleClick}
      role={(status === 'warning' || status === 'error') ? 'button' : undefined}
      tabIndex={(status === 'warning' || status === 'error') ? 0 : undefined}
      onKeyDown={(e) => {
        if ((status === 'warning' || status === 'error') && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={
        (status === 'warning' || status === 'error')
          ? `Sync status: ${getStatusText()}. Click to reconnect banks.`
          : `Sync status: ${getStatusText()}`
      }
    >
      <Icon className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true" />
      <span>{getStatusText()}</span>
    </motion.div>
  );
} 