import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import LoginForm from '../../components/form/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Container maxW="xl">
        <Box padding="4" bg="gray.100" maxW="3xl">
          Login page. Welcome to blah blah blah
        </Box>
        <Box padding="4" bg="gray.100" maxW="3xl">
          <LoginForm />
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
