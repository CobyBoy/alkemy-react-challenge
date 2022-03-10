import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DETAILS_ROUTE } from '../routes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const MealItem = ({ mealItem }) => {
  const { title, image, pricePerServing, nutrition } = mealItem;
  let navigate = useNavigate();
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

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          margin: '2rem',
          minWidth: '25rem',
          minHeight: '33rem',
        }}
        onClick={() => {
          handleClick();
        }}
      >
        <CardMedia
          component="img"
          image={image}
          width="50%"
          height="50%"
          alt={title}
        />
        <CardContent>
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
      </Card>
    </>
  );
};

export default MealItem;
