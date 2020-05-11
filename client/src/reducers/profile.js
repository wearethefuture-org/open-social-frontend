import {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_LOADING_DATA_SUCCESS,
  PROFILE_DATA_LOADING_DATA_FAILURE,
} from '../constants';

const initialState = {
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
    default:
      return state;
  }
};
