// src/pages/auth/VerifyEmail.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../../redux/authSlice';
import { type RootState } from '../../redux/store';

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { loading, error, message } = useSelector((state: RootState) => state.auth);
  


  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token) as any);
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✉️</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Email Verification
          </h1>

          {loading && (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground">Verifying your email...</p>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">❌</span>
              </div>
              <p className="text-destructive-foreground">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Login
              </button>
            </div>
          )}

          {message && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-foreground">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue to Login
              </button>
            </div>
          )}

          {!token && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Check your email for verification link. If you didn't receive it, check your spam folder or request a new one.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;