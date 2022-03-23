import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { authenticateAction } from '../../store/slices/user/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INDEX_ROUTE, HOME_ROUTE } from '../../routes';
import { getComplexMealsAction } from '../../store/slices/meal/mealReducer';
import Search from '../../components/search/Search';
import { NavLink } from 'react-router-dom';
import styles from './styles';

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
      <AppBar sx={styles.appBar} tabIndex={0}>
        <NavLink style={styles.navLink} to={HOME_ROUTE} aria-label="Menu">
          Menu
        </NavLink>

        <Toolbar sx={styles.toolBar}>
          <Search />
          <Button
            onClick={logout}
            sx={styles.button}
            variant={styles.button.variant()}
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