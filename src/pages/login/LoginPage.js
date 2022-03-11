import React from 'react';
import LoginForm from '../../components/form/LoginForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
  return (
    <>
      <Container>
        <Paper elevation={6}>
          <Box m={2}>
            <Typography align="center" variant="h5">
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
