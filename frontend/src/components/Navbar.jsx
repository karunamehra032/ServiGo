import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogOut, Home as HomeIcon, Calendar, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
              SG
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ServiGo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.isBtn ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className="btn-primary text-sm px-5 py-2.5"
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
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-1" /> Logout
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
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            item.isBtn ? (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2.5 text-indigo-600 hover:text-indigo-700 font-medium text-center"
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
              className="block py-2.5 text-red-600 hover:text-red-700 font-medium text-left"
            >
              <LogOut className="w-4 h-4 inline mr-2" /> Logout
            </button>
          )}
        </div>
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
