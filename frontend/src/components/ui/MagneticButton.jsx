import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  disabled = false,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const yVal = (e.clientY - rect.top - rect.height / 2) * 0.4;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
  };

  const style = {
    transform: `translate(${xSpring}px, ${ySpring}px)`,
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => {
        x.set(0);
        y.set(0);
      }}
      style={style}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-0 cursor-pointer overflow-hidden ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 bg-current opacity-10 scale-0 transition-transform duration-300"
      />
    </button>
  );
}
