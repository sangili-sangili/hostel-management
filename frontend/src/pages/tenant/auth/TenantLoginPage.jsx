import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../../../components/forms/Input';
import { Button } from '../../../components/common/Button';
import { Eye, EyeOff, Building2, Shield } from 'lucide-react';

export const TenantLoginPage = () => {
  const navigate = useNavigate();
  const { tenantLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('david@greenwoodliving.com');
  const [password, setPassword] = useState('hostel123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await tenantLogin({ email, password });
      navigate('/tenant/dashboard');
    } catch (err) {
      setError(err.message || 'Tenant login failed');
    }
  };

  const handleQuickDemo = async (roleEmail) => {
    setEmail(roleEmail);
    try {
      await tenantLogin({ email: roleEmail, password: 'demo' });
      navigate('/tenant/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-emerald-600 items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hostel Operations Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Tenant Administrator & Staff Sign-in</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your hostel</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage rooms, residents, beds, and billing</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@hostel.com"
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 font-semibold text-sm shadow-xs"
            >
              {isLoading ? 'Accessing Portal...' : 'Sign In to Hostel Portal'}
            </Button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('david@greenwoodliving.com')}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-center font-medium transition-colors"
              >
                Tenant Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('sarah.j@greenwoodliving.com')}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-center font-medium transition-colors"
              >
                Branch Manager
              </button>
            </div>
          </div>

          <div className="mt-5 text-center pt-3 border-t border-slate-100">
            <Link
              to="/login"
              className="inline-flex items-center text-xs text-blue-600 hover:underline font-medium gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Switch to Super Admin Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
