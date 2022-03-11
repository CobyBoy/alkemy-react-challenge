import React from 'react';
import image from '../../assets/images/Error404.jpg';
import { Button, CardMedia, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../routes';
import styles from './style';

const PageNotFound = () => {
  return (
    <Container style={styles.Container}>
      <CardMedia image={image} component="img" alt="Page Not Found" />
      <Button variant="contained" style={styles.Button}>
        <Link to={HOME_ROUTE} style={styles.Link}>
          Go Back Home
        </Link>
      </Button>
    </Container>
  );
};

export default PageNotFound;
