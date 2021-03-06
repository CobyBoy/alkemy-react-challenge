import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DETAILS_ROUTE, SEARCH_RESULTS_ROUTE } from '../../routes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getComplexMealsAction } from '../../store/slices/meal/mealReducer';
import * as logService from '../../services/logService';
import styles from './style';

const MealItem = ({ mealItem, pathname }) => {
  const { title, image, pricePerServing, nutrition, vegan } = mealItem;
  const currentMeals = useSelector((state) => state.persistedReducer.meals.data);
  const mealNutrientsFiltered = [
    'Calories',
    'Fat',
    'Carbohydrates',
    'Cholesterol',
  ];
  let mealNutrientsToShow = [];
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ADD = 'Add to menu';
  const DELETE = 'Delete';
  let propToRender = {
    textToDisplay: '',
    functionToDispacth: () => {},
    icon: '',
  };

  const nutrients = nutrition?.nutrients;
  const ingredients = nutrition?.ingredients;
  mealNutrientsFiltered?.map((nutrientName) => {
    mealNutrientsToShow.push(
      nutrients?.find((nutrient) => {
        return nutrient?.name == nutrientName;
      })
    );
  });
  const mealNutrientsToShowItems = mealNutrientsToShow?.map(
    ({ amount, name }, index) => (
      <div key={index + name}>
        <Typography>{name}</Typography>
        <div>{amount}</div>
      </div>
    )
  );

  const ingredientsToShowItems = ingredients?.map(({ name, id }, index) => (<span key={id + index}>{name}/ </span>));
  const functionReassign = (meal, e) => {
    e.target.textContent == ADD ? addToMenu(meal) : deleteMealFromMenu(meal);
  };

  if (pathname === SEARCH_RESULTS_ROUTE) {
    propToRender.textToDisplay = ADD;
    propToRender.functionToDispacth = functionReassign;
    propToRender.icon;
  } else {
    propToRender.textToDisplay = DELETE;
    propToRender.functionToDispacth = functionReassign;
    propToRender.icon = <DeleteIcon />;
  }

  const handleClick = () => {
    navigate(`${DETAILS_ROUTE}`);
  };

  const checkIfMealCanBeAddedToMenu = (
    currentMeals,
    mealToAdd,
    veganMeals,
    notVeganMeals
  ) => {
    if (currentMeals.length === 4) return logService.logError('Sorry, menu is full. Meal can\'t be added');
    if (
      (mealToAdd?.vegan && veganMeals >= 2) ||
      (!mealToAdd?.vegan && notVeganMeals >= 2)
    )
      return logService.logError(
        `Sorry, meal can't be added. There are already two ${ mealToAdd?.vegan ? 'vegan' : 'non-vegan'} meals on menu`
      );

    if (currentMeals.some((current) => current.id === mealToAdd?.id)) return logService.logError('Meal is already on the menu');
    dispatch(getComplexMealsAction.addMeal(mealItem));
    logService.showSuccessMessage('Success. Meal added to menu');
  };

  const addToMenu = (mealToAdd) => {
    let veganMeals = currentMeals.filter((currentMeal) => currentMeal?.vegan).length;
    let notVeganMeals = currentMeals.filter((currentMeal) => !currentMeal?.vegan).length;
    checkIfMealCanBeAddedToMenu(currentMeals, mealToAdd, veganMeals, notVeganMeals);
  };

  const deleteMealFromMenu = (mealToDelete) => {
    dispatch(getComplexMealsAction.deleteMealFromMenu(mealToDelete.id));
    logService.showSuccessMessage('Meal deleted successfully');
  };

  return (
    <>
      <Card sx={styles.Card} role="listitem" aria-label={title}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          decoding="async"
          aria-describedby={title}
        />
        <CardContent
          sx={styles.CardContent}
          onClick={() => {
            handleClick();
          }}
          tabIndex={0}
          role="figcaption"
        >
          <Typography>{title}</Typography>
          <div>Price: ${pricePerServing}</div>
          <Stack direction="row" spacing={2}>
            {mealNutrientsToShowItems}
          </Stack>
          <Typography>Ingredients</Typography>
          <div>{ingredientsToShowItems}</div>
        </CardContent>
        <CardActions style={styles.CardActions}>
          <Button
            onClick={(e) => {
              propToRender.functionToDispacth(mealItem, e);
            }}
            variant="contained"
            style={styles.renderButtonStyle(vegan)}
            startIcon={propToRender.icon}
            aria-label={propToRender.textToDisplay +' ' +title}
          >
            {propToRender.textToDisplay}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MealItem;
