import React from 'react';
import { Box, Container } from '@chakra-ui/react';

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
    <Box borderRadius="lg" maxWidth={'100%'}>
      <Container borderWidth={'1px'} padding="0" marginTop={'2rem'}>
        <Box backgroundColor={'ButtonFace'} padding=".5rem 1rem">
          Total Price:
        </Box>
        <Box padding=".5rem 1rem">${priceSum}</Box>
      </Container>
      <Container borderWidth={'1px'} padding="0" marginTop={'2rem'}>
        <Box backgroundColor={'ButtonFace'} padding=".5rem 1rem">
          Average Preparation Time:
        </Box>
        <Box padding=".5rem 1rem">{preparationTimeSum} minutes</Box>
      </Container>
      <Container borderWidth={'1px'} padding="0" marginTop={'2rem'}>
        <Box backgroundColor={'ButtonFace'} padding=".5rem 1rem">
          Average Health Score:
        </Box>
        <Box padding=".5rem 1rem">{healthScoreSum}</Box>
      </Container>
    </Box>
  );
};

export default AverageCard;
