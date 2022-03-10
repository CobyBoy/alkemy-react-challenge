import React from 'react';

const AverageCard = ({ meals }) => {
  let priceSum = 0;
  let preparationTimeSum = 0;
  let healthScoreSum = 0;

  meals.map((meal) => {
    priceSum += meal.pricePerServing;
    preparationTimeSum += meal.readyInMinutes / meals.length;
    healthScoreSum += meal.healthScore / meals.length;
  });

  return (
    <div>
      <div padding="0">
        <div padding=".5rem 1rem">
          Total Price:
        </div>
        <div padding=".5rem 1rem">${priceSum}</div>
      </div>
      <div padding="0">
        <div padding=".5rem 1rem">
          Average Preparation Time:
        </div>
        <div padding=".5rem 1rem">{preparationTimeSum} minutes</div>
      </div>
      <div padding="0">
        <div padding=".5rem 1rem">
          Average Health Score:
        </div>
        <div padding=".5rem 1rem">{healthScoreSum}</div>
      </div>
    </div>
  );
};

export default AverageCard;
