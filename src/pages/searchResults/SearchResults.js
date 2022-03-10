import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
//import MealItem from '../../components/MealItem';
import { getMeals } from '../../services/apiService';

const SearchResults = () => {

  const params = useParams();
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
      {console.log('params', mealSearched, params, 'location', search)}
      <div>searchResults</div>
    </>
  );
};

export default SearchResults;