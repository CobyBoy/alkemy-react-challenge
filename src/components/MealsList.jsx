import React from 'react';
import { DETAILS_ROUTE, HOME_ROUTE, SEARCH_RESULTS_ROUTE } from '../routes';
import DetailItem from './details/DetailItem';
import MealItem from './MealItem';

const MealsList = ({ meals, pathname }) => {
  console.log('pathname meallist', pathname);
  return (
    <>
      {pathname === HOME_ROUTE || pathname === SEARCH_RESULTS_ROUTE
        ? meals.map((meal) => (
          <MealItem key={meal.id} mealItem={meal} pathname={pathname}/>
        ))
        : pathname === DETAILS_ROUTE &&
          meals.map((meal) => <DetailItem key={meal.id} mealItem={meal} />)}
    </>
  );
};

export default MealsList;
