/**
 * Sidebar — Category navigation with icons and active state indicators.
 */
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

export default function Sidebar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
      <div className="sticky top-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-3 space-y-1"
        >
          {/* Home link */}
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium 
              transition-all duration-200 group
              ${isActive
                ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
              }
            `}
            id="sidebar-home"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${isHome 
                ? 'bg-brand-500/20' 
                : 'bg-surface-100 dark:bg-surface-800 group-hover:bg-surface-200 dark:group-hover:bg-surface-700'
              }`}
            >
              <Home className="w-4 h-4" />
            </div>
            <span>Dashboard</span>
          </NavLink>

          {/* Divider */}
          <div className="h-px bg-surface-200 dark:bg-surface-700 mx-3 my-2" />

          {/* Category links */}
          <div className="space-y-0.5">
            <p className="px-3 py-1 text-[10px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest">
              Converters
            </p>
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = location.pathname === `/convert/${category.id}`;

              return (
                <NavLink
                  key={category.id}
                  to={`/convert/${category.id}`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium 
                    transition-all duration-200 group relative
                    ${isActive
                      ? `${category.bgLight} ${category.bgDark} ${category.textColor}`
                      : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }
                  `}
                  id={`sidebar-${category.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 rounded-r-full"
                      style={{ backgroundColor: category.colorAccent }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? ''
                        : 'bg-surface-100 dark:bg-surface-800 group-hover:bg-surface-200 dark:group-hover:bg-surface-700'
                    }`}
                    style={isActive ? { backgroundColor: `${category.colorAccent}20` } : {}}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1">{category.name}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/50 dark:bg-black/20'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-400'
                  }`}>
                    {category.conversions.length}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
