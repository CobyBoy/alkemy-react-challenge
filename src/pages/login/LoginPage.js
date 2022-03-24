import React from 'react';
import LoginForm from '../../components/form/LoginForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import styles from './styles';

const LoginPage = () => {
  return (
    <>
      <Container>
        <Paper elevation={styles.paper.apply()}>
          <Box style={styles.box}>
            <Typography
              style={styles.typo}
              variant={styles.typo.variant()}
              id="loging-heading"
              role="heading"
              aria-level="1"
            >
              Login page. Welcome to blah blah blah
            </Typography>
          </Box>
          <Box>
            <LoginForm />
          </Box>
        </Paper>
      </Container>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
