import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                SG
              </div>
              <span className="text-xl font-bold text-white">ServiGo</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Making daily home help easy, verified, and affordable for everyone in your locality.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Maid / Bai</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Cook</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Driver</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Plumber</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Electrician</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition-colors">Babysitter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Join as Provider</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">+91 90000 00000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">support@servigo.in</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">Your City, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 ServiGo. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <span className="text-sm">f</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <span className="text-sm">w</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <span className="text-sm">in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
