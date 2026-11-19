import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogOut, Home as HomeIcon, Calendar, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PremiumNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar blur effect
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  // We won't add window listener here to keep it clean; Tailwind handles backdrop-blur

  const navItems = user
    ? [
        { to: '/customer/dashboard', label: 'Dashboard', icon: <Calendar className="w-4 h-4" /> },
        { to: '/book', label: 'Book Service', icon: <ShoppingBag className="w-4 h-4" /> },
        { to: '/my-bookings', label: 'My Bookings', icon: <Calendar className="w-4 h-4" /> },
        { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
      ]
    : [
        { to: '/login', label: 'Login', icon: null },
        { to: '/register', label: 'Join as Provider', icon: null, isBtn: true },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
              SG
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              ServiGo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isBtn ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all"
                >
                  {item.label}
                </Link>
              ) : (
                <navLink key={item.to} to={item.to} icon={item.icon}>
                  {item.label}
                </navLink>
              )
            ))}
            {user && (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-soft"
        >
          {navItems.map((item) => (
            item.isBtn ? (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2.5 text-indigo-600 hover:text-indigo-700 font-medium text-center px-4 rounded-xl bg-indigo-50"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2.5 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
          {user && (
            <button
              onClick={logout}
              className="block py-2.5 text-red-600 hover:text-red-700 font-medium text-left px-4"
            >
              <LogOut className="w-4 h-4 inline mr-2" /> Logout
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
}

function navLink({ to, icon, children }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
      {icon}
      {children}
    </Link>
  );
}
