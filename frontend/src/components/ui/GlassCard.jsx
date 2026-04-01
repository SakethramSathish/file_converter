/**
 * GlassCard — Reusable glassmorphic card component.
 */
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = '', 
  hover = false,
  onClick = null,
  delay = 0,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`
        bg-white/70 dark:bg-surface-800/60 
        backdrop-blur-xl 
        border border-white/20 dark:border-white/10 
        rounded-2xl 
        shadow-glass
        ${hover ? 'cursor-pointer hover:shadow-card-hover hover:border-brand-400/30 dark:hover:border-brand-400/20 transition-shadow duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
