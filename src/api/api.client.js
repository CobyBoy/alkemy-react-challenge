import axios from 'axios';
import { api_base, api } from '../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;
/**
 * 
 * @param {Object} data 
 * @returns {Promise}
 */
export const getLoginToken = (data) => axios.post(api_base.BASE_API_URL, data);
/**
 * 
 * @param {number} number 
 * @param {string} diet 
 * @param {string} ingredients 
 * @param {string} query 
 * @returns {Promise}
 */
export const getComplexMeals = (number= 2, diet = null, ingredients = null, query = null) => {
  const requestUrl = query
    ? `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=${number}&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}&query=${query}`
    : `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=${number}&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}`;
  return axios.get(requestUrl);
  
};