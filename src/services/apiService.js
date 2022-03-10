import * as apiClient from '../api/api.client';
import { authenticateAction } from './../store/userReducer';
import * as logService from './logService';
//import { getComplexMealsAction } from '../store/mealReducer';

import 'react-toastify/dist/ReactToastify.css';

export const startLogin = async (values, dispatch) => {
  try {
    const { data } = await apiClient.getLoginToken(values);
    logService.showSuccessMessage('Successful login');
    if (data === undefined) throw new Error('Could not login');
    console.log('data startLogin apiService', data);
    localStorage.setItem('loginToken', JSON.stringify(data.token));
    dispatch(
      authenticateAction.authenticate({
        authenticated: true,
        token: data.token,
      })
    );
    return data;
  } catch (error) {
    logService.logError(error.response.data.error);
  }
};

export const getMeals = async ({ diet, ingredients, query }) => {
  try {
    const { data } = await apiClient.getComplexMeals(diet, ingredients, query);

    if (data === undefined) throw new Error('Could not fetch data from resource');

    console.log('getMeals api service', data);
    return data.results;
  } catch (error) {
    logService.logError(error.response.data.message);
  }
};
