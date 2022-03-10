import React from 'react';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const DetailItem = ({ mealItem }) => {
  const { title, pricePerServing, readyInMinutes, healthScore } = mealItem;
  console.log('receing meal from dwatilitme', mealItem);
  return (
    <TableRow>
      <TableCell>
        <Typography>{title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>${pricePerServing}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{readyInMinutes} minutes</Typography>
      </TableCell>
      <TableCell>
        <Typography>{healthScore}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default DetailItem;
