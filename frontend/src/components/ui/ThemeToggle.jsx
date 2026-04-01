/**
 * ThemeToggle — Animated dark/light mode switch.
 */
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface-200 dark:bg-surface-700 
                 border border-surface-300 dark:border-surface-600 
                 transition-colors duration-300 focus:outline-none focus:ring-2 
                 focus:ring-brand-500/50"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-500 opacity-40" />
      <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-400 opacity-40" />

      {/* Sliding knob */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white dark:bg-surface-900 
                   shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-brand-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
