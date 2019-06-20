import { ADD_CITY } from './types';
import { ADD_HISTORY } from './types';

const initialState = {
  history: [],
  city: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return { ...state, city: [...state.history, action.payload] }
    case ADD_HISTORY:
      return { ...state, history: [action.payload, ...state.history] }
    default:
      return state;
  }
};