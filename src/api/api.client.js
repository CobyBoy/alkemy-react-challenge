import axios from 'axios';
import { api_base, api } from '../constants/api';

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;
export const getLoginToken = (data) => axios.post(api_base.BASE_API_URL, data);
export const getComplexMeals = (diet = null, ingredients = null, query = null) => {
  const requestUrl = query
    ? `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=2&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}&query=${query}`
    : `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=2&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}`;
  return axios.get(requestUrl);
  
};