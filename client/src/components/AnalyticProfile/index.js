import React from 'react';
import moment from 'moment';
import Layout from '../Layout/Layout';
import setCurrentTab from '../../actions/menu';
import { getDataAnalytics, setFilterAnalytic } from '../../actions/analytics';
import AnalyticProfile from './AnalyticProfile';

export default async function action({ store: { dispatch } }) {
  dispatch(setCurrentTab('Analytics'));
  dispatch(setFilterAnalytic({ name: 'users', step: 'day' }));

  const startDate = moment()
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');

  dispatch(
    getDataAnalytics({ endDate, name: 'users', startDate, step: 'day' }),
  );

  await dispatch;

  return {
    chunks: ['analytics'],
    component: (
      <Layout>
        <AnalyticProfile />
      </Layout>
    ),
    title: 'Analytics',
  };
}
