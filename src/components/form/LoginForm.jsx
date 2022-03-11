import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as apiService from '../../services/apiService';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './styles';

const LoginForm = () => {
  const initialValues = { email: 'challenge@alkemy.org', password: 'react' };
  const isUserAuthenticated = useSelector(state => state.persistedReducer.user.authenticated);
  const dispatch = useDispatch();
  const fieldsToValidate = {
    email: Yup.string().email().required('email required'),
    password: Yup.string().min(2).required('password required'),
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        apiService.startLogin(values, dispatch);
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={Yup.object(fieldsToValidate)}
    >
      {({ isSubmitting }) => (
        <Form>
          {console.log('selectorLoginFormIsAuth', isUserAuthenticated)}
          <Box sx={styles.Box}>
            <label htmlFor="email" style={styles.Label}>
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
              />
              <ErrorMessage
                name="email"
                component="div"
                style={styles.ErrorMessage}
              />
            </Box>
          </Box>
          <Box sx={styles.Box}>
            <label htmlFor="password" style={styles.Label}>
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
              />
              <ErrorMessage
                name="password"
                component="div"
                style={styles.ErrorMessage}
              />
            </Box>
          </Box>

          <Box sx={styles.Box}>
            <Button
              type="submit"
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
