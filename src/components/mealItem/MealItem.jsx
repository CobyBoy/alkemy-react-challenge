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
import { ToastContainer } from 'react-toastify';
import styles from './style';

const MealItem = ({ mealItem, pathname }) => {
  const { title, image, pricePerServing, nutrition} = mealItem;
  const currentMeals = useSelector((state) => state.persistedReducer.meals.data);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let propToRender = {
    textToDisplay: '',
    functionToDispacth: () => { },
    icon: ''
  };

  const functionReassign = (meal, e) => {
    console.log('funciton reassiing', meal, e);
    e.target.textContent == 'Add it'
      ? addToMenu(meal)
      : deleteMealFromMenu(meal);
    
  };


  if (pathname === SEARCH_RESULTS_ROUTE) {
    propToRender.textToDisplay = 'Add it';
    propToRender.functionToDispacth = functionReassign;
    propToRender.icon;
  }
  else {
    propToRender.textToDisplay = 'Delete it';
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
      logService.logError('Sorry, the menu is full. Meal cant be added');
    }
    else
    if (mealToAdd?.vegan && veganMeals >= 2) {
      logService.logError('Sorry, meal cant be added. There are already two vegan meals on menu');
    }else
    if (!mealToAdd?.vegan && notVeganMeals >= 2) {
      logService.logError(
        'Sorry, meal cant be added. there are already two non vegan meals on menu'
      );
    }
    else if (currentMeals.some(current => current.id === mealToAdd?.id)) {
      logService.logError('Sorry, meal is already on the menu');
    }
    else {
      logService.showSuccessMessage('Success. Meal added to menu');
      dispatch(getComplexMealsAction.addMeal(mealItem));
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
        <CardContent
          sx={styles.CardContent}
          onClick={() => {
            handleClick();
          }}
        >
          <CardMedia
            component="img"
            image={image}
            style={styles.CardMedia}
            alt={title}
          />

          <Typography>{title}</Typography>
          <div>Price: ${pricePerServing}</div>
          <Stack direction="row" spacing={2}>
            {mealNutrientsToShow?.map(({ amount, name }, index) => (
              <div key={index}>
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
        <CardActions>
          <Button
            onClick={(e) => {
              propToRender.functionToDispacth(mealItem, e);
            }}
            variant="contained"
            startIcon={propToRender.icon}
          >
            {propToRender.textToDisplay}
          </Button>
        </CardActions>
      </Card>
      <ToastContainer />
    </>
  );
};

export default MealItem;
