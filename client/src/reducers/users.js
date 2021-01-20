import {
  USERS_DATA_LOADING,
  USERS_DATA_LOADING_DATA_SUCCESS,
  USERS_DATA_LOADING_DATA_FAILURE,
  GET_USER_DATA,
} from '../constants';

const initialState = {
  data: [],
  error: '',
  isLoading: true,
  userOption: { id: '' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_LOADING_DATA_SUCCESS:
      return {
        ...state,
        data: Array.from(action.payload),
        error: '',
        isLoading: false,
      };
    case USERS_DATA_LOADING:
      return { ...state };
    case USERS_DATA_LOADING_DATA_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case GET_USER_DATA:
      return { ...state, userOption: { ...action.payload } };
    default:
      return state;
  }
};
