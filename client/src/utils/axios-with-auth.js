import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';
import * as JWT from 'jwt-decode';
import history from '../history';
import { apiURL } from '../constants';

const authHeader = {
  Authorization: isomorphicCookie.load('token')
    ? `Bearer ${isomorphicCookie.load('token')}`
    : null,
};

const authorize = response => {
  if (response.Message) {
    isomorphicCookie.remove('token');
    history.push('/login');
  }
};

export default {
  async get(url, data) {
    this.setHeader();
    const response = await axios.get(url, {
      headers: authHeader,
      params: data,
    })
    authorize(response.data);
    return response;
  },

  async post(url, data) {
    this.setHeader();
    const response = await axios.post(url, JSON.stringify(data), {
      headers: { ...authHeader, 'Content-Type': 'application/json' },
    });
    authorize(response.data);
    return response;
  },

  async put(url, data) {
    this.setHeader();
    const response = await axios.put(url, JSON.stringify(data), {
      headers: { ...authHeader, 'Content-Type': 'application/json' },
    });
    authorize(response.data);
    return response;
  },

  async saveUserProfilePhoto(profilePhoto) {
    this.setHeader();
    const formData = new FormData();
    formData.append('file', profilePhoto);
    try {
      return await axios.post(`${apiURL}/api/v1/users/images`, formData, {
        headers: { ...authHeader, 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      return error;
    }
  },

  setHeader() {
    if (!authHeader.Authorization) {
      authHeader.Authorization = `Bearer ${isomorphicCookie.load('token')}`;
    }
  },

  userId() {
    const token = isomorphicCookie.load('token');
    if (token) {
      return JWT(token).user.id;
    }
    return null;
  },
};
