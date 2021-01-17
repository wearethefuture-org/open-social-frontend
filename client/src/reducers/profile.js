import {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_LOADING_DATA_SUCCESS,
  PROFILE_DATA_LOADING_DATA_FAILURE,
  GET_USER_ANALYTICS,
} from '../constants';

const initialState = {
  analytics: {},
  error: '',
  isLoading: true,
  userOption: { id: '' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_DATA_LOADING_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: '',
        isLoading: false,
      };
    case PROFILE_DATA_LOADING:
      return { ...state };
    case PROFILE_DATA_LOADING_DATA_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case GET_USER_ANALYTICS:
      return { ...state, analytics: { ...action.payload } };
    default:
      return state;
  }
};
