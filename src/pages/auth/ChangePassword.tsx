// src/pages/auth/ChangePassword.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { changePassword } from '../../redux/authSlice';
import { type RootState } from '../../redux/store';
import { type ChangePasswordFormData } from '../../types/auth';

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, message } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<ChangePasswordFormData>({
    email: (location.state as { email: string })?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    dispatch(changePassword({ email: formData.email, password: formData.password }) as any)
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((err: Error) => {
        console.error('Password change failed:', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">🔑</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            New Password
          </h1>
          <p className="text-gray-400">Create your new password</p>
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Confirm new password"
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
                  Updating...
                </div>
              ) : (
                'Update Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Back to{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:text-secondary transition-colors font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;