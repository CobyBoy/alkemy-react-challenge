import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const LoadingPage = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '5rem' }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;