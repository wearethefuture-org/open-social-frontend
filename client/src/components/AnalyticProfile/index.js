import React from 'react';
import moment from 'moment';
import Layout from '../Layout/Layout';
import setCurrentTab from '../../actions/menu';
import { getDataAnalytic, setFilterAnalytic } from '../../actions/profile';
import AnalyticProfile from './AnalyticProfile';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('Analytic-profile'));
  dispatch(setFilterAnalytic({ name: 'users', step: 'day' }));

  const startDate = moment()
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');

  dispatch(getDataAnalytic({ endDate, name: 'users', startDate, step: 'day' }));

  await dispatch;

  return {
    chunks: ['analytic-profile'],
    component: (
      <Layout>
        <AnalyticProfile />
      </Layout>
    ),
    title: 'Analytic-profile',
  };
}
