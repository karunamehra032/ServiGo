import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/api/api';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SERVICES = [
  { id: 'maid', name: 'Maid / Bai', price: '₹4,000 / month', emoji: '🧹' },
  { id: 'cook', name: 'Cook', price: '₹6,000 / month', emoji: '👨‍🍳' },
  { id: 'driver', name: 'Driver', price: '₹8,000 / month', emoji: '🚗' },
  { id: 'plumber', name: 'Plumber', price: '₹500 / visit', emoji: '🔧' },
  { id: 'electrician', name: 'Electrician', price: '₹500 / visit', emoji: '💡' },
  { id: 'babysitter', name: 'Babysitter', price: '₹200 / hour', emoji: '👶' },
];

export default function BookService() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // eslint-disable-next-line no-unused-vars
  const currentUser = user;

  const validate = () => {
    if (!selected) {
      setMsg({ text: 'Please select a service', type: 'error' });
      return false;
    }
    if (!date) {
      setMsg({ text: 'Please select a date', type: 'error' });
      return false;
    }
    if (!time) {
      setMsg({ text: 'Please select a time', type: 'error' });
      return false;
    }
    setMsg({ text: '', type: '' });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const res = await api.post('/api/bookings', {
        serviceType: selected,
        date,
        time,
      });
      setMsg({ text: res.data.message || 'Booking request sent successfully!', type: 'success' });
      e.target.reset();
      setSelected(null);
      setDate('');
      setTime('');
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Booking failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Book a Service</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6 no-validate">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Select Service</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelected(s.id)}
                    className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                      selected === s.id
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="text-xl mb-2">{s.emoji}</span>
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-xs text-slate-500">{s.price}</span>
                  </button>
                ))}
              </div>
              {!selected && (
                <p className="text-xs text-red-600 mt-1">Please select a service</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              {!date && (
                <p className="text-xs text-red-600 mt-1">Please select a date</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Preferred Time</label>
              <input
                type="time"
                className="input-field"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              {!time && (
                <p className="text-xs text-red-600 mt-1">Please select a time</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading || !selected || !date || !time}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>

        {msg.text && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm">{msg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}
