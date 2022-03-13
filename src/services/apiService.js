import * as apiClient from '../api/api.client';
import { authenticateAction } from './../store/slices/user/userReducer';
import * as logService from './logService';
import * as cacheService from './cacheService';
import 'react-toastify/dist/ReactToastify.css';

/**
 * 
 * @param {Object} values 
 * @param {Dispatch<any>} dispatch 
 * @returns {string}
 */
export const startLogin = async (values, dispatch) => {
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
    return data.token;
  } catch (error) {
    logService.logError(error?.response?.data?.error);
  }
};
/**
 * 
 * @param {object} param0 
 * @returns {Array<T>}
 */
export const getMeals = async ({ number, diet, ingredients, query }) => {
  try {
    const { data } = await apiClient.getComplexMeals(number, diet, ingredients, query);

    if (data === undefined) throw new Error('Could not fetch data from resource');
    if (data.results.length === 0) logService.infoMessage('No results found');

    return data.results;
  } catch (error) {
    if(!error.response.data.message) logService.logError(error.message);
    else logService.logError(error?.response?.data?.message);
  }
};
