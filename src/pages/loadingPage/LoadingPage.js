import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles';
import { ToastContainer } from 'react-toastify';

const LoadingPage = () => {

  return (
    <div style={styles.circular}>
      <CircularProgress />
      <ToastContainer />
    </div>
  );
};

export default LoadingPage;