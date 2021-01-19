import {
  ANALYTICS_DATA_LOADING,
  ANALYTICS_DATA_LOADING_DATA_SUCCESS,
  ANALYTICS_DATA_LOADING_DATA_FAILURE,
  SET_FILTER_ANALYTIC,
} from '../constants';

const initialState = {
  analytics: {},
  error: '',
  filter: {},
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ANALYTICS_DATA_LOADING_DATA_SUCCESS:
      return {
        ...state,
        analytics: { ...action.payload },
        error: '',
        isLoading: false,
      };
    case ANALYTICS_DATA_LOADING:
      return { ...state };
    case ANALYTICS_DATA_LOADING_DATA_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case SET_FILTER_ANALYTIC:
      return {
        ...state,
        filter: { ...action.payload },
      };
    default:
      return state;
  }
};
