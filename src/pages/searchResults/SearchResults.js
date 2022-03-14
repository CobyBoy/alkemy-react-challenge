import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealsList from '../../components/mealsList/MealsList';
import { getMeals } from '../../services/apiService';
import Grid from '@mui/material/Grid';
import LoadingPage from '../../pages/loadingPage/LoadingPage';
import styles from './style';
import { ToastContainer } from 'react-toastify';

const SearchResults = () => {

  const {pathname} = useLocation();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let queryString = query.get('query');
  
  const [mealSearched, setMealSearched] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    getMeals({ resultsRequested: 20, query: queryString }).then((res) => {
      if (res === undefined) {
        setMealSearched([]);
        return;
      }
      setMealSearched(res);
      setLoading(false);
    });
  }, [queryString]);
  return (
    <>
      {loading || mealSearched.length === 0 ? (
        <LoadingPage />
      ) : (
        <Grid container style={styles.grid}>
          <MealsList meals={mealSearched} pathname={pathname}></MealsList>
        </Grid>
      )}
      <ToastContainer />
    </>
  );
};

export default SearchResults;