import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_RESULTS_ROUTE } from '../../routes';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import styles from './styles';
import * as logService from '../../services/logService';

const Search = () => {
  let navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ textSearch: '' }}
        validationSchema={Yup.object({
          textSearch: Yup.string().min(2).required('Min value must be 2'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          logService.infoMessage('Searching...');
          navigate(`${SEARCH_RESULTS_ROUTE}?query=${values.textSearch}`);
          setSubmitting(false);
          resetForm();
        }}
      >
        {() => (
          <Form role="search"  style={styles.Form}>
            <Box style={styles.box}>
              <label htmlFor="search" style={styles.Label}></label>
              <Field
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
                role="alert"
              />
            </Box>
            <Button
              type="submit"
              sx={styles.button}
              variant={styles.button.variant()}
              tabIndex={0}
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
