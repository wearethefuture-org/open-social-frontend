import React from 'react';
import Chats from './Chats';
import Layout from '../Layout';
import setCurrentTab from '../../actions/menu';
import { getUserData } from '../../actions/profile';

import apiClient from '../../utils/axios-with-auth';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('Chats'));
  dispatch(getUserData(apiClient.userId()));

  await dispatch;

  return {
    chunks: ['chats'],
    component: (
      <Layout>
        <Chats />
      </Layout>
    ),
    title: 'Chats',
  };
}
