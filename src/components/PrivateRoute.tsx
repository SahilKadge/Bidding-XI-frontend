// import { useCallback, useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { requests } from "../axios/requests";

// const PrivateRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   const checkAuth = useCallback(async () => {
//     try {
//       const res = await requests.checkAuth();

//       if (res.status === 200) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
// src/components/RoleBasedRoute.tsx
import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { type RootState } from '../redux/store';

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;