/**
 * ProgressBar — Animated conversion progress indicator.
 */
import { motion } from 'framer-motion';

export default function ProgressBar({ progress = 0, isActive = false }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
          {progress < 100 ? 'Converting...' : 'Complete!'}
        </span>
        <span className="text-sm font-semibold text-brand-500">
          {progress}%
        </span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            progress >= 100
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
              : 'bg-gradient-to-r from-brand-500 to-purple-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        {isActive && progress < 100 && (
          <motion.div
            className="h-full w-1/3 rounded-full bg-white/30 -mt-2.5"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  );
}
