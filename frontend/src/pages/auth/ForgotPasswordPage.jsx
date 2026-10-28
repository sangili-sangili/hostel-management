import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await authService.forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Reset Password</h2>
        <p className="text-sm text-slate-500 mt-1">We will send a reset link to your email</p>
      </div>

      {submitted ? (
        <div className="text-center py-4">
          <p className="text-sm text-slate-700 mb-4">
            If an account exists for <span className="font-semibold">{email}</span>, a password reset link has been sent.
          </p>
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Back to login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2.5"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-xs text-slate-500 hover:text-slate-800">
              Return to sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
