import React from 'react';
import MealItem from './MealItem';

const MealsList = ({ meals }) => {
  console.log('mealslist', meals);
  return (
    <div spacing={5}>
      {meals.map((meal) => (
        <MealItem key={meal.id} mealItem={meal} />
      ))}
    </div>
  );
};

export default MealsList;
