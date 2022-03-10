import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { styles } from './styles';

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
    <Card sx={{ width: '100%', margin: '2rem' }}>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Total Price:
          </Typography>
          <div style={styles.CardSection}>${priceSum}</div>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Average Preparation Time:
          </Typography>
          <div style={styles.CardSection}>{preparationTimeSum} minutes</div>
        </Paper>
      </CardContent>
      <CardContent>
        <Paper>
          <Typography style={(styles.CardSection, styles.CardContentTitle)}>
            Average Health Score:
          </Typography>
          <div style={styles.CardSection}>{healthScoreSum}</div>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AverageCard;
