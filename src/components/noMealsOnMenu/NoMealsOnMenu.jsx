import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styles from './styles';

const NoMealsOnMenu = () => {
  return (
    <Container>
      <Typography style={styles.Typo}>
        Use the search bar to add meals to the menu. You can add 2 vegan and 2
        non vegan meals to your menu
      </Typography>
    </Container>
  );
};

export default NoMealsOnMenu;