import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMeals } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import MealsList from '../../components/mealsList/MealsList';
import AverageCard from '../../components/averageCard/AverageCard';
import { getComplexMealsAction } from '../../store/slices/meal/mealReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import LoadingPage from '../loadingPage/LoadingPage';
import styles from './styles';
import NoMealsOnMenu from '../../components/noMealsOnMenu/NoMealsOnMenu';

const HomePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const mealsData = useSelector((state) => state.persistedReducer.meals.data);
  const [loading, setLoading] = useState(false);

  const resolvePromises = () => {
    return Promise.all([
      getMeals({ diet: 'vegan' }),
      getMeals({ ingredients: 'meat' }),
    ]);
  };

  useEffect(() => {
    let mealsCombined = [];
    if (mealsData?.length === 0) {
      setLoading(true);
      resolvePromises().then((mealsArray) => {
        mealsArray?.map((mealArray) => {
          mealArray?.map((meal) => {
            mealsCombined.push(meal);
          });
        });

        dispatch(getComplexMealsAction.setMealsData(mealsCombined));
        if (mealsCombined.length !== 0) setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading && mealsData?.length === 0 ? (
        <LoadingPage />
      ) : (
        !loading && mealsData?.length === 0 && <NoMealsOnMenu />
      )}
      <Grid container style={styles.Grid}>
        <MealsList meals={mealsData} pathname={pathname} />
        <AverageCard meals={mealsData} />
      </Grid>

      <ToastContainer />
    </>
  );
};

export default HomePage;
