import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-soft p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
