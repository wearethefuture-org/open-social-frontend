import { SET_CURRENT_TAB, SET_CURRENT_LANG } from '../constants';

const initialState = {
  currentTab: '',
  isLoading: true,
  lang: 'en',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return { ...state, currentTab: action.payload, isLoading: false };
    case SET_CURRENT_LANG:
      return { ...state, lang: action.lang };
    default:
      return state;
  }
};
