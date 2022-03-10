import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormLabel } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_RESULTS_ROUTE } from '../routes';

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
            <FormLabel htmlFor="search" style={{ margin: '1rem' }}>
              Search
            </FormLabel>
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
              style={{ width: '100%', margin: '1rem' }}
            />
            <ErrorMessage
              name="textSearch"
              component="div"
              style={{ color: 'red' }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Search;
