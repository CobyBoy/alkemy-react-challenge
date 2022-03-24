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
    <Card
      sx={styles.Card}
      tabIndex={0}
      role="region"
      aria-label="Price, average preparation time and health score."
    >
      <CardContent>
        <Paper>
          <Typography
            style={(styles.CardSection, styles.CardContentTitle)}
            component="h5"
          >
            Total Price:
          </Typography>
          <p style={styles.CardSection}>${price}.</p>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography
            style={(styles.CardSection, styles.CardContentTitle)}
            component="h5"
          >
            Average Preparation Time:
          </Typography>
          <p style={styles.CardSection}>{preparationTime} minutes.</p>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography
            style={(styles.CardSection, styles.CardContentTitle)}
            component="h5"
          >
            Average Health Score:
          </Typography>
          <p style={styles.CardSection}>{healthScore}.</p>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AverageCard;
