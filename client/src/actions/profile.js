import apiClient from '../utils/axios-with-auth';
import {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_LOADING_DATA_SUCCESS,
  PROFILE_DATA_LOADING_DATA_FAILURE,
  apiURL,
  GET_COUNTER,
  GET_USER_DATA,
  COUNTERS_DATA_SUCCESS,
  SET_FILTER_ANALYTIC,
} from '../constants';

const profileDataSuccess = payload => ({
  payload,
  type: PROFILE_DATA_LOADING_DATA_SUCCESS,
});

const profileDataFailure = error => ({
  error,
  type: PROFILE_DATA_LOADING_DATA_FAILURE,
});

const profileDataLoading = () => ({
  type: PROFILE_DATA_LOADING,
});

const userData = payload => ({
  payload,
  type: GET_USER_DATA,
});

const counters = payload => ({
  payload,
  type: GET_COUNTER,
});

const analyticDataSuccess = payload => ({
  payload,
  type: COUNTERS_DATA_SUCCESS,
});

export const setUserData = id => dispatch => {
  dispatch(userData(id));
};

export const setFilterAnalytic = payload => ({
  payload,
  type: SET_FILTER_ANALYTIC,
});

// eslint-disable-next-line unicorn/consistent-function-scoping
export const getCounters = id => async dispatch => {
  try {
    const { data } = await apiClient.get(
      `${apiURL}/api/v1/users/counters/${id}`,
    );
    dispatch(counters(data));
  } catch (error) {
    dispatch(profileDataFailure(error.message));
  }
};

export const getUserData = id => async dispatch => {
  dispatch(profileDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users/${id}`);
    dispatch(profileDataSuccess(data));
    dispatch(getCounters(id));
  } catch (error) {
    dispatch(profileDataFailure(error.message));
  }
};

export const editProfile = ({
  firstName,
  lastName,
  birthdayDate,
  userName,
  email,
}) => async dispatch => {
  dispatch(profileDataLoading());
  try {
    const { data } = await apiClient.put(
      `${apiURL}/api/v1/users/${apiClient.userId()}`,
      {
        birthdayDate,
        email,
        firstName,
        lastName,
        userName,
      },
    );
    dispatch(profileDataSuccess(data));
  } catch (error) {
    dispatch(profileDataFailure(error.message));
  }
};

export const getDataAnalytic = ({
  name,
  startDate,
  endDate,
  step,
}) => async dispatch => {
  dispatch(profileDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users/counters`, {
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
    dispatch(analyticDataSuccess(data));
  } catch (error) {
    dispatch(profileDataFailure(error.message));
  }
};
