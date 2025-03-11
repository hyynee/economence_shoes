import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard/Dashboard';
import { getStorageJSON, USERLOGIN } from '../../util/config';

const PrivateRoute = (props) => {
  const token = getStorageJSON(USERLOGIN)?.token;
  return token ? <Dashboard /> : <Navigate to="/login" />
}

export default PrivateRoute

