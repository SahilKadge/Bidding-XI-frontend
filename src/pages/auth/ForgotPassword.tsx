// src/pages/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../redux/authSlice';
import { type RootState } from '../../redux/store';


const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(resetPassword({ email }) as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">🔒</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400">Enter your email to receive OTP</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-destructive-foreground text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-chart-3/10 border border-chart-3 rounded-lg">
              <p className="text-chart-3 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your registered email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>

          {message && (
            <div className="mt-6 text-center">
              <Link
                to="/verify-otp"
                className="text-primary hover:text-secondary transition-colors font-semibold"
              >
                Enter OTP
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Remember your password?{' '}
              <Link to="/login" className="text-primary hover:text-secondary transition-colors font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;