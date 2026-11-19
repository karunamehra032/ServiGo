import { Link } from 'react-router-dom';
import { Calendar, ShoppingBag, User as UserIcon, Clock } from 'lucide-react';

const stats = [
  { label: 'Total Bookings', value: '12', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Completed', value: '8', icon: <Clock className="w-5 h-5" /> },
  { label: 'Pending', value: '3', icon: <ShoppingBag className="w-5 h-5" /> },
  { label: 'Providers', value: '150+', icon: <UserIcon className="w-5 h-5" /> },
];

const quickActions = [
  { to: '/book', label: 'Book a Service', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-indigo-600' },
  { to: '/my-bookings', label: 'My Bookings', icon: <Calendar className="w-5 h-5" />, color: 'bg-emerald-600' },
  { to: '/profile', label: 'My Profile', icon: <UserIcon className="w-5 h-5" />, color: 'bg-slate-600' },
];

export default function CustomerDashboard() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back to ServiGo</p>
          </div>
          <Link to="/book" className="btn-primary">
            New Booking
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="card flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-slate-500 font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${a.color} text-white group-hover:scale-110 transition-transform`}>
                  {a.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
