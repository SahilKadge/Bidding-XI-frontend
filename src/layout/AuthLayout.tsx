// src/layout/AuthLayout.tsx
import React from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from '../redux/store';

const AuthLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen cricket-field-bg">
      <Outlet />
    </div>
  );
};

export default AuthLayout;