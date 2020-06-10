import { ADD_CITY } from './types';
import { ADD_NUMBER } from './types';
import { ADD_HISTORY } from './types';

export const addCity = city => ({
  type: ADD_CITY,
  payload: city,
});
export const addHistory = city => ({
  type: ADD_HISTORY,
  payload: city,
});
export const addNumber = () => ({
  type: ADD_NUMBER
});