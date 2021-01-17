import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { connect, useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';
import { Typography } from '@material-ui/core';
import s from './Chart.scss';
import textData from '../../../utils/lib/languages.json';
import CustomTooltip from './CustomTooltip/CustomTooltip';

const Chart = ({ countUsers, countChats, startDate }) => {
  const lang = useSelector(store => store.menu.lang);
  const name = useSelector(store => store.analytics.filter.name);
  const {
    analyticsPage: { chart },
  } = textData;

  return (
    <>
      <Typography variant="h3" className={s.title}>
        {chart[name].name[lang]}
      </Typography>
      <ResponsiveContainer height={235} width="100%">
        <AreaChart
          data={countUsers || countChats}
          margin={{
            bottom: 0,
            left: 24,
            right: 16,
            top: 16,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
            tooltipOne={chart[name].tooltipOne[lang]}
            tooltipSecond={chart[name].tooltipSecond[lang]}
            cursor={false}
            animationDuration={300}
            startDate={startDate}
          />
          <Area
            dataKey="count"
            type="monotone"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

Chart.propTypes = {
  countChats: PropTypes.arrayOf(PropTypes.object),
  countUsers: PropTypes.arrayOf(PropTypes.object),
  startDate: PropTypes.string,
};

Chart.defaultProps = {
  countChats: null,
  countUsers: null,
  startDate: 'start date',
};

Chart.whyDidYouRender = true;

export default connect(
  ({
    analytics: {
      analytics: { countUsers, countChats },
      filter: { startDate },
    },
  }) => ({
    countChats,
    countUsers,
    startDate,
  }),
)(withStyles(s)(React.memo(Chart)));
