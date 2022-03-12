import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles';

const LoadingPage = () => {

  return (
    <div style={styles.circular}>
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;