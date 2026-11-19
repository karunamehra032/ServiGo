import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Mail, Phone, MapPin } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="card">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-4xl mb-4">
              <UserIcon />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-indigo-600 font-medium">{user.role}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <Mail className="w-5 h-5 text-slate-500" />
              <span className="text-sm text-slate-600">{user.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <Phone className="w-5 h-5 text-slate-500" />
              <span className="text-sm text-slate-600">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <MapPin className="w-5 h-5 text-slate-500" />
              <span className="text-sm text-slate-600">{user.address?.city || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
