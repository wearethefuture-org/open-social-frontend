import React from 'react';
import Layout from '../Layout';
import setCurrentTab from '../../actions/menu';
import UsersPage from './UsersPage';
import { getUsersData } from '../../actions/users';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('Users'));
  dispatch(getUsersData());

  await dispatch;

  return {
    chunks: ['users'],
    component: (
      <Layout>
        <UsersPage />
      </Layout>
    ),
    title: 'users',
  };
}
