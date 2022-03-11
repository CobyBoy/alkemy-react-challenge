import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
//import Typography from '@mui/material/Typography';
import { authenticateAction } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INDEX_ROUTE } from '../routes';
import { getComplexMealsAction } from '../store/mealReducer';
import Search from '../components/search/Search';
import { NavLink } from 'react-router-dom';

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
        <NavLink
          style={{
            textDecoration: 'none',
            color: 'inherit',
            alignSelf: 'center',
            margin:'0.5rem'
          }}
          to="home"
        >
          Menu
        </NavLink>
        <Search />
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            onClick={logout}
            sx={{ border: '1px solid #ffffff' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Box>
  );
};

export default PrivateLayout;