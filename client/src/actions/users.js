import apiClient from '../utils/axios-with-auth';
import {
  apiURL,
  USERS_DATA_LOADING,
  USERS_DATA_LOADING_DATA_FAILURE,
  USERS_DATA_LOADING_DATA_SUCCESS,
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

export const getUsersData = () => async dispatch => {
  dispatch(userDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users`);
    dispatch(userDataSuccess(data));
  } catch (error) {
    dispatch(userDataFailure(error.message));
  }
};
export const getUsersWithParams = ({ search }) => async dispatch => {
  dispatch(userDataLoading());
  try {
    const { data } = await apiClient.get(
      `${apiURL}/api/v1/users?search=%${search}%`,
    );
    dispatch(userDataSuccess(data));
  } catch (error) {
    dispatch(userDataFailure(error.message));
  }
};
