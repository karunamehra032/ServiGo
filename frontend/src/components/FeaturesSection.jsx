import { motion } from 'framer-motion';
import { ShieldCheck, Clock, RefreshCw, HandHeart } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Police Verified',
    desc: 'Every provider undergoes ID and background verification before joining.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Pay After Work',
    desc: 'Money is held securely and released only when you mark the job complete.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Replacement Guarantee',
    desc: 'If your provider doesn’t show up, we send a verified replacement same day.',
  },
  {
    icon: <HandHeart className="w-6 h-6" />,
    title: 'Local Support',
    desc: 'Dedicated local team in your city to help you anytime.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose ServiGo?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built for small towns and big cities alike — trust, transparency, and simplicity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="card p-8 text-center hover:border-indigo-200 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
