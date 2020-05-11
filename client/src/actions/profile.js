import apiClient from '../utils/axios-with-auth';
import {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_LOADING_DATA_SUCCESS,
  PROFILE_DATA_LOADING_DATA_FAILURE,
  apiURL,
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

export const getUserData = id => async dispatch => {
  dispatch(profileDataLoading());
  try {
    const { data } = await apiClient.get(`${apiURL}/api/v1/users/${id}`);
    dispatch(profileDataSuccess(data));
  } catch (error) {
    dispatch(profileDataFailure(error.message));
  }
};
