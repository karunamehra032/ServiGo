import { motion } from 'framer-motion';

export default function ScrollReveal({ children, variant = 'up', delay = 0, className = '' }) {
  const variants = {
    up: {
      initial: { y: 60, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
  };

  return (
    <motion.div
      className={`reveal-wrapper transition-all duration-700 ${className}`}
      initial={variants[variant].initial}
      animate={variants[variant].animate}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
