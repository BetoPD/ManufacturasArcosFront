import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function AdminRoutes() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const admin = user?.role === 'admin';

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!admin) return <Navigate to="/" replace />;

  return <Outlet />;
}
