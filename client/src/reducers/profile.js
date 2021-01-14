import {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_LOADING_DATA_SUCCESS,
  PROFILE_DATA_LOADING_DATA_FAILURE,
  GET_COUNTER,
  COUNTERS_DATA_SUCCESS,
  SET_FILTER_ANALYTIC,
} from '../constants';

const initialState = {
  analytics: {},
  counters: {},
  error: '',
  filterAnalytic: {},
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
    case GET_COUNTER:
      return { ...state, counters: { ...action.payload } };
    case COUNTERS_DATA_SUCCESS:
      return {
        ...state,
        analytics: { ...action.payload },
        error: '',
        isLoading: false,
      };
    case SET_FILTER_ANALYTIC:
      return {
        ...state,
        error: '',
        filterAnalytic: { ...action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};
