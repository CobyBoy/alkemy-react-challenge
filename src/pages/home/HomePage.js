import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMeals } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import MealsList from '../../components/MealsList';
import AverageCard from '../../components/averageCard/AverageCard';
import CircularProgress from '@mui/material/CircularProgress';
import { getComplexMealsAction } from '../../store/mealReducer';
import Search from '../../components/search/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const mealsData = useSelector(
    (state) => state.persistedReducer.meals.data
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mealsCombined = [];
    if (mealsData.length === 0) {
      Promise.all([
        getMeals({ diet: 'vegan' }),
        getMeals({ ingredients: 'meat' }),
      ]).then((mealsArray) => {
        mealsArray.map((mealArray) => {
          console.log('elemtn', mealArray);
          mealArray?.map((meal) => {
            mealsCombined.push(meal);
          });
        });

        dispatch(getComplexMealsAction.setMealsData(mealsCombined));
        console.log('primises', mealsArray);
      });
      //dispatch(getComplexMealsAction.getMealsData());
    }
    setLoading(false);
  }, [dispatch, mealsData.length]);

  return (
    <>
      {loading ||
        (!mealsData.length && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ))}
      <>
        <Search></Search>
        <ToastContainer />
        <Grid container display={'flex'}>
          <MealsList meals={mealsData} pathname={pathname}/>
          <AverageCard meals={mealsData} />
        </Grid>
      </>
    </>
  );
};

export default HomePage;
