import React from 'react';
import Layout from '../Layout/Layout';
import ForgotPasswordPage from './ForgotPasswordPage';
import setCurrentTab from '../../actions/menu';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('ForgotPassword'));
  await dispatch;

  return {
    chunks: ['forgot-password'],
    component: (
      <Layout>
        <ForgotPasswordPage />
      </Layout>
    ),
    title: 'ForgotPassword',
  };
}
