import * as apiClient from '../api/api.client';
import { authenticateAction } from './../store/userReducer';
import * as logService from './logService';
import 'react-toastify/dist/ReactToastify.css';

export const startLogin = async (values, dispatch) => {
  try {
    const { data } = await apiClient.getLoginToken(values);
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

export const getMeals = async ({ number, diet, ingredients, query }) => {
  try {
    const { data } = await apiClient.getComplexMeals(number, diet, ingredients, query);

    if (data === undefined) throw new Error('Could not fetch data from resource');
    if (data.results.length === 0) logService.infoMessage('No results found');

    console.log('getMeals api service', data);
    return data.results;
  } catch (error) {
    if(!error.response.data.message) logService.logError(error.message);
    else logService.logError(error.response.data.message);
  }
};
