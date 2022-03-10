import React from 'react';
import { VStack } from '@chakra-ui/react';
import MealItem from './MealItem';

const MealsList = ({ meals }) => {
  console.log('mealslist', meals);
  return (
    <VStack spacing={5}>
      {meals.map((meal) => (
        <MealItem key={meal.id} mealItem={meal} />
      ))}
    </VStack>
  );
};

export default MealsList;
