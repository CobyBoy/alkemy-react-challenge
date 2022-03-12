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
  const { title, image, pricePerServing, nutrition} = mealItem;
  const currentMeals = useSelector((state) => state.persistedReducer.meals.data);
  const dispatch = useDispatch();
  let navigate = useNavigate(); 
  const ADD = 'Add to menu';
  const DELETE = 'Delete';
  let propToRender = {
    textToDisplay: '',
    functionToDispacth: () => { },
    icon: ''
  };

  const functionReassign = (meal, e) => {
    console.log('funciton reassiing', meal, e);
    e.target.textContent == ADD ? addToMenu(meal) : deleteMealFromMenu(meal);
    
  };


  if (pathname === SEARCH_RESULTS_ROUTE) {
    propToRender.textToDisplay = ADD;
    propToRender.functionToDispacth = functionReassign;
    propToRender.icon;
  }
  else {
    propToRender.textToDisplay = DELETE;
    propToRender.functionToDispacth = functionReassign;
    propToRender.icon = <DeleteIcon/>;
  }
  const mealNutrientsFiltered = [
    'Calories',
    'Fat',
    'Carbohydrates',
    'Cholesterol',
  ];
  let mealNutrientsToShow = [];
  const nutrients = nutrition?.nutrients;
  const ingredients = nutrition?.ingredients;
  mealNutrientsFiltered.map((nutrientName) => {
    mealNutrientsToShow.push(
      nutrients?.find((nutrient) => {
        return nutrient?.name == nutrientName;
      })
    );
  });

  const handleClick = () => {
    navigate(`${DETAILS_ROUTE}`);
  };

  const addToMenu = (mealToAdd) => {
    console.log('addToMenu', mealToAdd);
    let veganMeals = currentMeals.filter((currentMeal) => currentMeal?.vegan).length;
    let notVeganMeals = currentMeals.filter((currentMeal) => !currentMeal?.vegan).length;

    if (currentMeals.length === 4) {
      logService.logError('Sorry, menu is full. Meal can\'t be added');
    }
    else
    if (mealToAdd?.vegan && veganMeals >= 2) {
      logService.logError('Sorry, meal can\'t be added. There are already two vegan meals on menu');
    }else
    if (!mealToAdd?.vegan && notVeganMeals >= 2) {
      logService.logError(
        'Sorry, meal can\'t be added. There are already two non vegan meals on menu'
      );
    }
    else if (currentMeals.some(current => current.id === mealToAdd?.id)) {
      logService.logError('Meal is already on the menu');
    }
    else {
      dispatch(getComplexMealsAction.addMeal(mealItem));
      logService.showSuccessMessage('Success. Meal added to menu');
    }
  };

  const deleteMealFromMenu = (mealToDelete) => {
    console.log('Meal to delete', mealToDelete);
    dispatch(getComplexMealsAction.deleteMealFromMenu(mealToDelete.id));
    logService.showSuccessMessage('Meal deleted successfully');
  };

  return (
    <>
      <Card sx={styles.Card}>
        <CardMedia component="img" image={image} alt={title} />
        <CardContent
          sx={styles.CardContent}
          onClick={() => {
            handleClick();
          }}
        >
          <Typography>{title}</Typography>
          <div>Price: ${pricePerServing}</div>
          <Stack direction="row" spacing={2}>
            {mealNutrientsToShow?.map(({ amount, name }, index) => (
              <div key={index + name}>
                <Typography>{name}</Typography>
                <div>{amount}</div>
              </div>
            ))}
          </Stack>
          <Typography>Ingredients</Typography>
          <div>
            {ingredients?.map(({ name, id }, index) => (
              <span key={id + index}>{name}/ </span>
            ))}
          </div>
        </CardContent>
        <CardActions style={styles.CardActions}>
          <Button
            onClick={(e) => {
              propToRender.functionToDispacth(mealItem, e);
            }}
            variant="contained"
            style={styles.Button}
            startIcon={propToRender.icon}
          >
            {propToRender.textToDisplay}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MealItem;
