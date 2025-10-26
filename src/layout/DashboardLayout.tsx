// src/layout/DashboardLayout.tsx
import React from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { type RootState } from '../redux/store';

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = (): void => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-lg">🏏</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Cricket <span className="gradient-accent-text">Auction</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user?.fullname}</p>
                <p className="text-muted-foreground text-sm capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-destructive text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;