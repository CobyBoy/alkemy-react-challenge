import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MealsList from '../../components/MealsList';
//import MealItem from '../../components/MealItem';
import { getMeals } from '../../services/apiService';
import Grid from '@mui/material/Grid';
import LoadingPage from '../../pages/loadingPage/LoadingPage';

const SearchResults = () => {

  const {pathname} = useLocation();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let queryString = query.get('query');
  
  const [mealSearched, setMealSearched] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    getMeals({ number:20, query: queryString }).then((res) => {
      console.log('query on Search', res);
      console.log('query?', queryString);
      if (res === undefined) { setMealSearched([]); return; }
      setMealSearched(res);
      setLoading(false);
    });
  }, [queryString]);
  return (
    <>
      {console.log(
        'params mealSearched',
        mealSearched,
        'pathname',
        pathname,
        'search',
        search
      )}
      {loading || mealSearched.length === 0 ? <LoadingPage /> : (
        <Grid container>
          <MealsList meals={mealSearched} pathname={pathname}></MealsList>
        </Grid>
      )}
      

      <ToastContainer />
    </>
  );
};

export default SearchResults;