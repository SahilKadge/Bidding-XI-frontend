// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ChangePassword from "./pages/auth/ChangePassword";

// Dashboard Pages
import Dashboard from "./pages/dashboard/MainDashboard";

// Error Pages
import NotFound from "./pages/errorPages/NotFound";
import Unauthorized from "./pages/errorPages/Unauthorized";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Auth Routes - Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<PrivateRoute allowedRoles={["team", "manager"]} />}>
          {/* Routes accessible by all authenticated users */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Super Admin only routes */}
          <Route element={<RoleBasedRoute allowedRoles={["manager"]} />}>
            <Route element={<DashboardLayout />}>
              {/* Add super admin specific routes here */}
              <Route path="/admin" element={<div className="p-6 text-white">Super Admin Panel</div>} />
            </Route>
          </Route>

          {/* Manager only routes */}
          <Route element={<RoleBasedRoute allowedRoles={["manager", "manager"]} />}>
            <Route element={<DashboardLayout />}>
              {/* Add manager specific routes here */}
              <Route path="/manager" element={<div className="p-6 text-white">Manager Panel</div>} />
            </Route>
          </Route>

          {/* Team only routes */}
          <Route element={<RoleBasedRoute allowedRoles={["team", "team"]} />}>
            <Route element={<DashboardLayout />}>
              {/* Add team specific routes here */}
              <Route path="/team" element={<div className="p-6 text-white">Team Panel</div>} />
            </Route>
          </Route>
        </Route>

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;