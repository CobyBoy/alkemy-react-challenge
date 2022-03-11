import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { authenticateAction } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INDEX_ROUTE } from '../routes';
import { getComplexMealsAction } from '../store/mealReducer';

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authenticateAction.logout());
    dispatch(getComplexMealsAction.clearOnLogOut());
    navigate(`${INDEX_ROUTE}`);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Box>
  );
};

export default PrivateLayout;