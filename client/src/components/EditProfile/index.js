import React from 'react';
import Layout from '../Layout/Layout';
import setCurrentTab from '../../actions/menu';
import EditProfilePage from './EditProfile';
import { getUserData } from '../../actions/profile';
import apiClient from '../../utils/axios-with-auth';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('Edit-profile'));
  dispatch(getUserData(apiClient.userId()));

  await dispatch;

  return {
    chunks: ['edit-profile'],
    component: (
      <Layout>
        <EditProfilePage />
      </Layout>
    ),
    title: 'Edit-profile',
  };
}
