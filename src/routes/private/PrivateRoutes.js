import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';
import { INDEX_ROUTE } from '..';

const PrivateRoutes = ({isAuthenticated }) => {
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={INDEX_ROUTE} />;
};

export default PrivateRoutes;