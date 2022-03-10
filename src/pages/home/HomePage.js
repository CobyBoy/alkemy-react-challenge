import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMeals } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import MealsList from '../../components/MealsList';
import AverageCard from '../../components/AverageCard';
import { HStack, CircularProgress } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { getComplexMealsAction } from '../../store/mealReducer';
import Search from '../../components/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  
  const mealsData = useSelector((state) => state.meal.data);
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
      {loading || !mealsData.length && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress
            isIndeterminate
            color="green.400"
            size={'5rem'}
            justifySelf={'center'}
            alignSelf={'center'}
          />
        </div>
      ) 
      }
      <>
        <Search></Search>
        <ToastContainer/>
        <HStack justifyContent={'center'}>
          <MealsList meals={mealsData} />
          <VStack>
            <AverageCard meals={mealsData} />
          </VStack>
        </HStack>
      </>
    </>
  );
};

export default HomePage;
