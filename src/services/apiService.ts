import * as apiClient from '../api/api.client';
import { ComplexMeal } from '../shared/interfaces';
import { authenticateAction } from '../store/slices/user/userReducer';
import * as logService from './logService';
import * as cacheService from './cacheService';
import 'react-toastify/dist/ReactToastify.css';
import { LoginValues } from '../shared/interfaces';
import { Dispatch } from 'redux';

export const startLogin = async (values: LoginValues, dispatch: Dispatch<any>) => {
  try {
    const { data } = await apiClient.getLoginToken(values);
    if (data === undefined) throw new Error('Could not login');
    cacheService.saveUserToken(JSON.stringify(data.token));
    dispatch(
      authenticateAction.authenticate({
        authenticated: true,
        token: data.token,
      })
    );
  } catch (error) {
    logService.logError(error?.response?.data?.error);
  }
};

export const getMeals = async ({resultsRequested, diet, ingredients, query, }: ComplexMeal) => {
  try {
    const { data } = await apiClient.getComplexMeals({
      resultsRequested,
      diet,
      ingredients,
      query,
    });

    if (data === undefined) throw new Error('Could not fetch data from resource');
    if (data.results.length === 0) logService.infoMessage('No results found');
    return data.results;
  } catch (error) {
    console.log(error.message);
    if (!error?.response?.data?.message) logService.logError(error.message);
    else logService.logError(error?.response?.data?.message);
  }
};
