import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormLabel, Button } from '@chakra-ui/react';
import * as Yup from 'yup';
import * as apiService from '../../services/apiService';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const initialValues = { email: 'challenge@alkemy.org', password: 'react' };
  const isUserAuthenticated = useSelector(state => state.user.authenticated);
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
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="challenge@alkemy.org"
            size="lg"
            style={{ width: '100%' }}
          />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="react"
            size="lg"
            style={{ width: '100%' }}
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: 'red' }}
          />
          <div>
            <Button colorScheme="blue" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <ToastContainer />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
