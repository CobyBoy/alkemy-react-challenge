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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const mealsData = useSelector((state) => state.persistedReducer.meals.data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mealsCombined = [];
    if (mealsData.length === 0) {
      setLoading(true);
      Promise.all([
        getMeals({ diet: 'vegan' }),
        getMeals({ ingredients: 'meat' }),
      ]).then((mealsArray) => {
        mealsArray?.map((mealArray) => {
          console.log('elemtn', mealArray);
          mealArray?.map((meal) => {
            mealsCombined.push(meal);
          });
        });

        dispatch(getComplexMealsAction.setMealsData(mealsCombined));
        setLoading(false);
        console.log('primises', mealsArray, 'mealscombined', mealsCombined);
      });
    }
  }, []);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && mealsData.length === 0 && (
        <Container>
          <Typography style={styles.Typo}>Use the search bar to add meals to the menu. You can add 2 vegan and 2 non vegan meals to your menu</Typography>
        </Container>
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
