import React from 'react';
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
      <div
        onClick={() => {
          handleClick(id);
        }}
      >
        <div width={'30rem'}>
          <img src={image} alt="" />
          <div>{title}</div>
          <div>Price: ${pricePerServing}</div>
          <div style={{ display: 'flex' }}>
            {mealNutrientsToShow?.map(({ amount, name }, index) => (
              <div key={index} style={{ width: '25%' }}>
                <div>{name}</div>
                <div>{amount}</div>
              </div>
            ))}
          </div>
          <div>Ingredients</div>
          <div>
            {ingredients?.map(({ name, id }, index) => (
              <span key={id + index}>{name}/ </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealItem;
