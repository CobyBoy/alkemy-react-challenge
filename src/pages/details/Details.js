import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MealsList from '../../components/MealsList.jsx';
//import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import styles  from './styles';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

const Details = () => {
  let { pathname } = useLocation();
  const meals = useSelector((state) => state.persistedReducer.meals.data);
  console.log('meals', meals);

  return (
    <Paper elevation={8}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant={styles.typoVariant()}>Title</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={styles.typoVariant()}>Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={styles.typoVariant()}>
                Preparation Time
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant={styles.typoVariant()}>
                Health Score
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MealsList meals={meals} pathname={pathname}></MealsList>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Details;
