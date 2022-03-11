import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_RESULTS_ROUTE } from '../../routes';
import { Button } from '@mui/material';
import styles from './styles';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  let navigate = useNavigate();
  const handleSearch = (e, handleChange) => {
    handleChange(e);
    let value = e.target.value;
    if (value.length >= 2) {
      setSearchText(value);
    }
  };

  const searchMeal = (e) => {
    if ((e.key === 'Enter' || e.type == 'click') && searchText.length >= 2) {
      setSearchText('');
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
          <Form style={styles.Form}>
            <label htmlFor="search" style={styles.Label}>
              Search for meal
            </label>
            <Field
              onChange={(e) => {
                handleSearch(e, handleChange);
              }}
              onKeyDown={(e) => {
                searchMeal(e);
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
            <Button
              sx={{ color: 'inherit', border: '1px solid #ffffff' }}
              variant="outlined"
              onClick={(e) => searchMeal(e)}
            >
              Search
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Search;
