import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_RESULTS_ROUTE } from '../../routes';
import styles from './styles';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  let navigate = useNavigate();
  const handleSearch = (e, handleChange) => {
    handleChange(e);
    let value = e.target.value;
    if (value.length >= 2) {
      console.log(value);
      setSearchText(value);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && searchText.length >= 2) {
      navigate(`${SEARCH_RESULTS_ROUTE}?query=${searchText}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ textSearch: '' }}
        validationSchema={Yup.object({
          textSearch: Yup.string().min(2).required('Min value must be 2'),
        })}
      >
        {({ handleChange }) => (
          <Form>
            <label htmlFor="search" style={styles.Label}>
              Search
            </label>
            <Field
              onChange={(e) => {
                handleSearch(e, handleChange);
              }}
              onKeyDown={(e) => {
                handleKey(e);
              }}
              id="search"
              type="text"
              name="textSearch"
              placeholder="Search for meal"
              size="lg"
              style={styles.InputField}
            />
            <ErrorMessage
              name="textSearch"
              component="div"
              style={styles.ErrorMessage}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Search;
