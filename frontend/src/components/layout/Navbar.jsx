/**
 * Navbar — Sticky glassmorphic top navigation bar.
 */
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl bg-white/70 dark:bg-surface-800/60 backdrop-blur-xl 
                        border border-white/20 dark:border-white/10 shadow-glass px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" id="navbar-logo">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 
                              flex items-center justify-center shadow-lg shadow-brand-500/30
                              group-hover:shadow-brand-500/50 transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-surface-900 dark:text-white tracking-tight">
                  Convert<span className="gradient-text">X</span>
                </span>
                <span className="text-[10px] font-medium text-surface-400 dark:text-surface-500 -mt-1 tracking-wider uppercase">
                  File Converter
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-brand-500'
                    : 'text-surface-600 dark:text-surface-300 hover:text-brand-500'
                }`}
                id="nav-dashboard"
              >
                Dashboard
              </Link>
              <a
                href="https://github.com/SakethramSathish"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-brand-500 transition-colors"
              >
                GitHub
              </a>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn-ghost p-2"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav dropdown */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pt-3 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="flex flex-col gap-2 pb-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-brand-500 py-2 transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
