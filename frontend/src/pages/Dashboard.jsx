/**
 * Dashboard — Landing page with hero, category cards, stats, and recent conversions.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Clock, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { CATEGORIES, TOTAL_CONVERSIONS, TOTAL_CATEGORIES } from '../utils/constants';
import { getRecentConversions, timeAgo, formatFileSize } from '../utils/helpers';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard() {
  const recentConversions = getRecentConversions();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                        bg-brand-100 dark:bg-brand-900/30 
                        border border-brand-200 dark:border-brand-800/50 
                        text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Universal File Converter
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-surface-900 dark:text-white tracking-tight">
          Convert anything,{' '}
          <span className="gradient-text">instantly</span>
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl">
          Transform your files between {TOTAL_CONVERSIONS}+ formats across {TOTAL_CATEGORIES} categories.
          Documents, images, audio, video, and more — all in one place.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap gap-4 sm:gap-6"
      >
        {[
          { icon: Zap, label: 'Conversions', value: `${TOTAL_CONVERSIONS}+`, color: 'text-amber-500' },
          { icon: Shield, label: 'Secure', value: 'Local', color: 'text-emerald-500' },
          { icon: Clock, label: 'Processing', value: 'Instant', color: 'text-brand-500' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl 
                                           bg-white/50 dark:bg-surface-800/40 
                                           border border-white/20 dark:border-white/5">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div>
              <p className="text-sm font-bold text-surface-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Category Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Link to={`/convert/${category.id}`} id={`card-${category.id}`}>
                <GlassCard hover className="p-6 group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${category.colorAccent}20, ${category.colorAccent}10)`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.colorAccent }} />
                    </div>
                    <div className="flex items-center gap-1.5 text-surface-400 dark:text-surface-500 
                                    group-hover:text-brand-500 transition-colors">
                      <span className="text-xs font-medium">Open</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.conversions.slice(0, 3).map((conv) => (
                      <span
                        key={conv.id}
                        className="text-[10px] font-medium px-2 py-1 rounded-md 
                                   bg-surface-100 dark:bg-surface-800 
                                   text-surface-500 dark:text-surface-400"
                      >
                        {conv.name}
                      </span>
                    ))}
                    {category.conversions.length > 3 && (
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-md 
                                       bg-brand-100 dark:bg-brand-900/30 
                                       text-brand-600 dark:text-brand-400">
                        +{category.conversions.length - 3} more
                      </span>
                    )}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">
            Recent Conversions
          </h2>
          <GlassCard className="divide-y divide-surface-100 dark:divide-surface-800 overflow-hidden">
            {recentConversions.slice(0, 5).map((conv, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                    {conv.conversionName}
                  </p>
                  <p className="text-xs text-surface-400 dark:text-surface-500">
                    {conv.inputFile} → {conv.outputFile}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-surface-500">{formatFileSize(conv.size)}</p>
                  <p className="text-[10px] text-surface-400">{timeAgo(conv.timestamp)}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
