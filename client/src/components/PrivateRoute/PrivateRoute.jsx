import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard/Dashboard';
import { ADMINLOGIN, getStorageJSON } from '../../util/config';

const AdminPrivateRoute = () => {
  const token = getStorageJSON(ADMINLOGIN)?.token;
  return token ? <Dashboard /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
