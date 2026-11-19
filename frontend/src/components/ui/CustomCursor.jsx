import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Only show on desktop
  if (window.innerWidth <= 768) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{ x: pos.x, y: pos.y }}
      animate={{
        scale: hovered ? 3 : 1,
        backgroundColor: hovered ? 'rgba(99, 102, 241, 0.2)' : '#6366f1',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-4 h-4 rounded-full bg-indigo-600 absolute -top-2 -left-2 border-2 border-white mix-blend-difference" />
    </motion.div>
  );
}
