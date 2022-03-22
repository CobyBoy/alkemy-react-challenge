import React, { useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { styles } from './styles';

const AverageCard = ({ meals }) => {
  const [price, setPrice] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);
  const [healthScore, setHealthScore] = useState(0);
  let priceSum = 0;
  let preparationTimeSum = 0;
  let healthScoreSum = 0;

  meals?.map((meal) => {
    priceSum += meal.pricePerServing;
    preparationTimeSum += meal.readyInMinutes / meals.length;
    healthScoreSum += meal.healthScore / meals.length;
  });

  useMemo(() => {
    setPrice(priceSum);
    setPreparationTime(preparationTimeSum);
    setHealthScore(healthScoreSum);
  }, [priceSum, preparationTimeSum, healthScoreSum]);
  

  return (
    <Card sx={styles.Card}>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Total Price:
          </Typography>
          <div style={styles.CardSection}>${price}</div>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Average Preparation Time:
          </Typography>
          <div style={styles.CardSection}>{preparationTime} minutes</div>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Average Health Score:
          </Typography>
          <div style={styles.CardSection}>{healthScore}</div>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AverageCard;
