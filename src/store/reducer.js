import { ADD_CITY } from './types';
import { ADD_HISTORY } from './types';

const initialState = {
  history: [],
  city: [{ name: 'San Diego, US' }, { name: 'Orlando, US' }]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return { ...state, city: [...state.city, action.payload] }
    case ADD_HISTORY:
      return { ...state, history: [action.payload, ...state.history] }
    default:
      return state;
  }
};