import { ADD_CITY } from './types';
import { ADD_HISTORY } from './types';

export const addPerson = city => ({
  type: ADD_CITY,
  payload: city,
});
export const addHistory = city => ({
  type: ADD_HISTORY,
  payload: city,
});