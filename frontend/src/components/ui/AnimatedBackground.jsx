/**
 * AnimatedBackground — Floating gradient orbs for visual depth.
 */
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-surface-50 dark:bg-surface-950 transition-colors duration-500" />

      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-purple-500/5 dark:from-brand-500/10 dark:via-transparent dark:to-purple-500/10" />

      {/* Floating orbs */}
      <motion.div
        className="orb w-[500px] h-[500px] bg-brand-400 -top-48 -left-48"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="orb w-[600px] h-[600px] bg-purple-400 -bottom-64 -right-64"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 20, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="orb w-[300px] h-[300px] bg-pink-400 top-1/2 left-1/3"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="orb w-[250px] h-[250px] bg-cyan-400 top-1/4 right-1/4 opacity-20"
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
