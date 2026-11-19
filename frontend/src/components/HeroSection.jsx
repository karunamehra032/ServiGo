import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Clock, User as UserIcon } from 'lucide-react';
import CustomCursor from '@/components/ui/CustomCursor';

const features = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Verified Providers', desc: 'Police & ID verified for your safety' },
  { icon: <Clock className="w-5 h-5" />, title: 'Fixed Pricing', desc: 'No hidden charges, pay after work' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Instant Booking', desc: 'Book in 30 seconds, get confirmation fast' },
  { icon: <UserIcon className="w-5 h-5" />, title: 'Replacement Guarantee', desc: 'Same-day backup if provider doesn’t come' },
];

export default function HeroSection() {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900" />
      
      {/* Floating decorative blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-100 text-xs font-semibold tracking-wide uppercase">
            🚀 New in ServiGo
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            Roz ka kaam, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-emerald-300 to-blue-300">
              Verified saath.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed"
          >
            Ghar ke liye bai, cook, driver, ya attendant book karein. Police-verified providers, fixed price, aur replacement guarantee. Payment sirf kaam ke baad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full sm:w-auto px-8 py-4 text-lg"
              onClick={scrollToServices}
            >
              Explore Services
            </motion.button>
            <Link to="/login" className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
              Login / Join
            </Link>
          </div>
        </motion.div>

        {/* 3D Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10">
            <div className="w-full h-[500px] bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative group">
              {/* Abstract 3D service icons floating */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="flex flex-wrap gap-4 justify-center">
                  {['🧹', '👨‍🍳', '🚗', '🔧', '💡', '👶'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl border border-white/10 shadow-lg"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-indigo-600 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-md border-t border-white/20 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                i === 0 ? 'bg-indigo-500/20 text-indigo-400' :
                i === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                i === 2 ? 'bg-purple-500/20 text-purple-400' :
                'bg-pink-500/20 text-pink-400'
              }`}>
                {f.icon}
              </div>
              <h4 className="text-sm font-bold text-white">{f.title}</h4>
              <p className="text-xs text-slate-300 leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CustomCursor />
    </div>
  );
}
