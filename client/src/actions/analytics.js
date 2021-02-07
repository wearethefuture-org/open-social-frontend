import apiClient from '../utils/axios-with-auth';
import {
  ANALYTICS_DATA_LOADING,
  ANALYTICS_DATA_LOADING_DATA_SUCCESS,
  ANALYTICS_DATA_LOADING_DATA_FAILURE,
  apiURL,
  SET_FILTER_ANALYTIC,
} from '../constants';

const analyticsDataSuccess = payload => ({
  payload,
  type: ANALYTICS_DATA_LOADING_DATA_SUCCESS,
});

const analyticsDataFailure = error => ({
  error,
  type: ANALYTICS_DATA_LOADING_DATA_FAILURE,
});

const analyticsDataLoading = () => ({
  type: ANALYTICS_DATA_LOADING,
});

export const setFilterAnalytic = payload => ({
  payload,
  type: SET_FILTER_ANALYTIC,
});

export const getDataAnalytics = ({
  name,
  startDate,
  endDate,
  step,
}) => async dispatch => {
  dispatch(analyticsDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users/analytics`, {
      endDate,
      name,
      startDate,
      step,
    });
    dispatch(
      setFilterAnalytic({
        endDate,
        name,
        startDate,
        step,
      }),
    );
    dispatch(analyticsDataSuccess(data));
  } catch (error) {
    dispatch(analyticsDataFailure(error.message));
  }
};
