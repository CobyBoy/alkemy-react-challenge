import axios from 'axios';
import { AxiosResponse } from 'axios';
import { api_base, api } from '../constants/api';
import {
  ComplexMeal,
  LoginValues,
  ComplexMealApiResult,
  tokenApiResult,
} from '../shared/interfaces';

const API_KEY = process.env.REACT_APP_API_KEY;

export const getLoginToken = (data: LoginValues): Promise<AxiosResponse<tokenApiResult>> =>
  axios.post(api_base.BASE_API_URL, data);

export const getComplexMeals = ({
  resultsRequested = 2,
  diet,
  ingredients,
  query,
}: ComplexMeal): Promise<
  AxiosResponse<ComplexMealApiResult>
> => {
  const requestUrl = query
    ? `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=${resultsRequested}&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}&query=${query}`
    : `${api.API_URL}complexSearch?apiKey=${API_KEY}&includeNutrition=true&number=${resultsRequested}&addRecipeNutrition=true&diet=${diet}&includeIngredients=${ingredients}`;
  return axios.get(requestUrl);
};

