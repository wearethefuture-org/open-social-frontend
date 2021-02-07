/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable unicorn/consistent-function-scoping */
import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';
import moment from 'moment';
import history from '../history';
import { SET_USER_MESSAGE, SET_USER_AUTH, apiURL } from '../constants';

const setUserMessage = message => ({
  message,
  type: SET_USER_MESSAGE,
});

const DELAY = 4500;

const resetMessage = () => ({
  message: '',
  type: SET_USER_MESSAGE,
});

const setUserAuth = data => ({
  data,
  type: SET_USER_AUTH,
});

export const login = ({ email, password }) => dispatch => {
  setTimeout(() => dispatch(resetMessage()), DELAY);
  const cookieExpires = 60;
  return axios
    .post(
      `${apiURL}/api/v1/auth/login`,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          Authorization: '',
          'content-type': 'application/json',
        },
      },
    )
    .then(async response => {
      await isomorphicCookie.save('token', response.data.token, {
        expires: moment()
          .add(cookieExpires, 'minute')
          .toDate(),
        secure: false,
      });

      const token = await isomorphicCookie.load('token');
      dispatch(setUserAuth(response.data.user));

      return dispatch(setUserMessage('You are logged in.'));
    })
    .catch(error => {
      const { response } = error;
      if (response) {
        dispatch(setUserMessage(response.data.message));
      }
      return error.toJSON();
    });
};

export const signup = ({
  firstName,
  lastName,
  birthdayDate,
  userName,
  email,
  password,
}) => dispatch => {
  setTimeout(() => dispatch(resetMessage()), DELAY);
  return axios
    .post(
      `${apiURL}/api/v1/auth/register`,
      {
        birthdayDate,
        email,
        firstName,
        lastName,
        password,
        userName,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then(response => {
      dispatch(setUserMessage(response.data.message));
      return response;
    })
    .catch(error => {
      const { response } = error;
      dispatch(setUserMessage(response.data.message));
      return error.toJSON();
    });
};

export const signout = () => dispatch => {
  isomorphicCookie.remove('token');
  history.push('/login');
  dispatch(setUserMessage('Signed out!'));
  setTimeout(() => dispatch(resetMessage()), DELAY);
};
