import React from 'react';
import { Box, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DETAILS_ROUTE } from '../routes';

const MealItem = ({ mealItem }) => {
  const { title, image, pricePerServing, nutrition, id } = mealItem;
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

  const handleClick = (id) => {
    navigate(`${DETAILS_ROUTE}/${id}`);
  };

  return (
    <>
      <Box
        backgroundColor={'ButtonFace'}
        borderRadius="md"
        shadow="lg"
        borderWidth="4px"
        flex="1"
        cursor={'pointer'}
        onClick={() => {
          handleClick(id);
        }}
      >
        <Stack width={'30rem'}>
          <Image src={image} alt="" />
          <div>{title}</div>
          <div>Price: ${pricePerServing}</div>
          <div style={{ display: 'flex' }}>
            {mealNutrientsToShow?.map(({ amount, name }, index) => (
              <div key={index} style={{ width: '25%' }}>
                <Box>{name}</Box>
                <Box>{amount}</Box>
              </div>
            ))}
          </div>
          <div>Ingredients</div>
          <div>
            {ingredients?.map(({ name, id }, index) => (
              <span key={id + index}>{name}/ </span>
            ))}
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default MealItem;
