import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CustomerDashboard from '@/pages/CustomerDashboard';
import ProviderDashboard from '@/pages/ProviderDashboard';
import BookService from '@/pages/BookService';
import MyBookings from '@/pages/MyBookings';
import Profile from '@/pages/Profile';
import PremiumNavbar from '@/components/PremiumNavbar';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <PremiumNavbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Customer Routes */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Provider Routes */}
              <Route
                path="/provider/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['provider', 'admin']}>
                    <ProviderDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/book"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <BookService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute
                    allowedRoles={['customer', 'provider', 'admin']}
                  >
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
