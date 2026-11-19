import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, User as UserIcon, ShieldCheck, Phone, MapPin } from 'lucide-react';

const services = [
  {
    id: 'maid',
    name: 'Maid / Bai',
    desc: 'Daily home cleaning & household help',
    price: '₹4,000 / month',
    emoji: '🧹',
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    id: 'cook',
    name: 'Cook',
    desc: 'Home cooked meals daily',
    price: '₹6,000 / month',
    emoji: '👨‍🍳',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'driver',
    name: 'Driver',
    desc: 'Personal & office driver',
    price: '₹8,000 / month',
    emoji: '🚗',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    id: 'plumber',
    name: 'Plumber',
    desc: 'Leakage repair & pipe work',
    price: '₹500 / visit',
    emoji: '🔧',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: 'electrician',
    name: 'Electrician',
    desc: 'Wiring & electrical repair',
    price: '₹500 / visit',
    emoji: '💡',
    icon: <Phone className="w-5 h-5" />,
  },
  {
    id: 'babysitter',
    name: 'Babysitter',
    desc: 'Child care & elder attendant',
    price: '₹200 / hour',
    emoji: '👶',
    icon: <MapPin className="w-5 h-5" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Services We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Trusted local help for your daily routine. Book once, relax forever.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="card flex flex-col group cursor-pointer"
            >
              <div className="h-48 rounded-2xl bg-white overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {s.emoji}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{s.name}</h3>
              <p className="text-slate-600 text-sm mb-4 flex-1">{s.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-indigo-600">{s.price}</span>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  Book Now <span className="w-4 h-4">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
