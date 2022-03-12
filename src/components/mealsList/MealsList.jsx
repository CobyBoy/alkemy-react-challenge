import React from 'react';
import { DETAILS_ROUTE, HOME_ROUTE, SEARCH_RESULTS_ROUTE } from '../../routes';
import DetailItem from '../details/DetailItem';
import MealItem from '../mealItem/MealItem';

const MealsList = ({ meals, pathname }) => {
  const isHomeOrSearchRoute = pathname === HOME_ROUTE || pathname === SEARCH_RESULTS_ROUTE;
  const isDetailsRoute = pathname === DETAILS_ROUTE;
  
  return (
    <>
      {isHomeOrSearchRoute
        ? meals?.map((meal) => (
          <MealItem key={meal.id} mealItem={meal} pathname={pathname} />
        ))
        : isDetailsRoute &&
          meals?.map((meal) => <DetailItem key={meal.id} mealItem={meal} />)}
      
    </>
  );
};

export default MealsList;
