import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealsList from '../../components/MealsList';
//import MealItem from '../../components/MealItem';
import { getMeals } from '../../services/apiService';

const SearchResults = () => {

  const {pathname} = useLocation();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let queryString = query.get('query');
  
  const [mealSearched, setMealSearched] = useState([]);
    
  useEffect(() => {
    getMeals({ query: queryString }).then((res) => {
      console.log('query on Search', res);
      console.log('query?', queryString);
      setMealSearched(res);
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
      <div>searchResults</div>
      <MealsList meals={mealSearched} pathname={pathname}></MealsList>
    </>
  );
};

export default SearchResults;