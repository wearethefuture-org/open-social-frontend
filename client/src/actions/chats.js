import apiClient from '../utils/axios-with-auth';
import {
  USERS_DATA_LOADING,
  USERS_DATA_LOADING_DATA_SUCCESS,
  USERS_DATA_LOADING_DATA_FAILURE,
  apiURL,
} from '../constants';

const userDataSuccess = payload => ({
  payload,
  type: USERS_DATA_LOADING_DATA_SUCCESS,
});

const userDataFailure = error => ({
  error,
  type: USERS_DATA_LOADING_DATA_FAILURE,
});

const userDataLoading = () => ({
  type: USERS_DATA_LOADING,
});

export function getUsersData() {
  return async dispatch => {
    dispatch(userDataLoading());
    try {
      const { data } = await apiClient.get(`${apiURL}/api/v1/users/`);
      dispatch(userDataSuccess({ data }));
    } catch (error) {
      dispatch(userDataFailure(error.message));
    }
  };
}

export const getUserData = id => async dispatch => {
  dispatch(userDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users/${id}`);
    dispatch(userDataSuccess(data));
  } catch (error) {
    dispatch(userDataFailure(error.message));
  }
};
