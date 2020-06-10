import { ADD_CITY } from './types';
import { ADD_HISTORY } from './types';
import { ADD_NUMBER } from './types';

const initialState = {
  newNumber: 0,
  history: [],
  city: [{ name: 'San Diego, US' }, { name: 'Orlando, US' }]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return { ...state, city: [...state.city, action.payload] }
    case ADD_HISTORY:
      return { ...state, history: [action.payload, ...state.history] }
    case ADD_NUMBER:
      const temp = state.newNumber + 1
      return { ...state, newNumber: temp }
    default:
      return state;
  }
};