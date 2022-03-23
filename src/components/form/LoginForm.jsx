import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as apiService from '../../services/apiService';
import * as logService from '../../services/logService';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './styles';

const LoginForm = () => {
  const initialValues = { email: '', password: '' };
  const dispatch = useDispatch();
  const fieldsToValidate = {
    email: Yup.string().email().required('email required'),
    password: Yup.string().min(2).required('password required'),
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        logService.infoMessage('Loggin in... Please wait...');
        apiService.startLogin(values, dispatch);
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={Yup.object(fieldsToValidate)}
    >
      {({ isSubmitting }) => (
        <Form id="loginForm" role={'form'} tabIndex={0} data-testid="form">
          <Box sx={styles.Box}>
            <label htmlFor="email" id="emailLabel" style={styles.Label}>
              Email address
            </label>

            <Box borderRadius={'2rem'}>
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="challenge@alkemy.org"
                size="lg"
                style={styles.InputField}
                required
                aria-label="Insert email"
                aria-labelledby="emailLabel"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={styles.ErrorMessage}
                role="alert"
              />
            </Box>
          </Box>
          <Box sx={styles.Box}>
            <label htmlFor="password" id="passwordLabel" style={styles.Label}>
              Password
            </label>
            <Box>
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="react"
                size="lg"
                style={styles.InputField}
                required
                aria-label="Insert password"
                aria-labelledby="passwordLabel"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={styles.ErrorMessage}
                role="alert"
              />
            </Box>
          </Box>

          <Box sx={styles.Box}>
            <Button
              type="submit"
              id="loginButton"
              disabled={isSubmitting}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
