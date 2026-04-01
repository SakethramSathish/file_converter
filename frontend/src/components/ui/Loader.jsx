/**
 * Loader — Skeleton loading & spinner components.
 */
import { motion } from 'framer-motion';

export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={`${sizeMap[size]} border-2 border-surface-200 dark:border-surface-700 
                  border-t-brand-500 rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-surface-200 dark:bg-surface-700" />
        <div className="flex-1">
          <div className="h-4 w-24 bg-surface-200 dark:bg-surface-700 rounded" />
          <div className="h-3 w-16 bg-surface-200 dark:bg-surface-700 rounded mt-2" />
        </div>
      </div>
      <div className="h-3 w-full bg-surface-200 dark:bg-surface-700 rounded" />
      <div className="h-3 w-3/4 bg-surface-200 dark:bg-surface-700 rounded mt-2" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-surface-500 dark:text-surface-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
