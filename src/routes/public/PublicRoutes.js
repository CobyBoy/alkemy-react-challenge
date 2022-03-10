import React from 'react';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '..';

const PublicRoutes = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to={HOME_ROUTE} />;
};

export default PublicRoutes;
