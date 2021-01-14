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

const CustomTooltip = ({
  active,
  payload,
  label,
  tooltipOne,
  tooltipSecond,
}) => {
  if (payload === null || typeof payload === 'undefined') return null;

  if (active) {
    return (
      <div className={s.customTooltip}>
        <div className={s.label}>
          {tooltipOne} <span className={s.labelDate}>{label}</span>:{' '}
          <span className={s.spanLabel}>{payload[0].value}</span>
        </div>
        <div>
          {tooltipSecond} <span className={s.labelDate}>{label}</span>:{' '}
          <span className={s.spanLabel}>{payload[0].payload.count}</span>
        </div>
      </div>
    );
  }

  return null;
};

const Chart = ({ countUsers, countChats }) => {
  const lang = useSelector(store => store.menu.lang);
  const name = useSelector(store => store.userProfile.filterAnalytic.name);
  const {
    analyticPage: { chart },
  } = textData;

  return (
    <>
      <Typography variant="h3" className={s.title}>
        {chart[name].name[lang]}
      </Typography>
      <ResponsiveContainer height={200} width="100%">
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
            content={CustomTooltip}
            tooltipOne={chart[name].tooltipOne[lang]}
            tooltipSecond={chart[name].tooltipSecond[lang]}
            cursor={false}
            animationDuration={300}
          />
          <Area
            dataKey="sumCount"
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
  countChats: PropTypes.array,
  countUsers: PropTypes.array,
};

Chart.defaultProps = {
  countChats: null,
  countUsers: null,
};

Chart.whyDidYouRender = true;

export default connect(
  ({
    userProfile: {
      analytics: { countUsers, countChats },
    },
  }) => ({
    countChats,
    countUsers,
  }),
)(withStyles(s)(React.memo(Chart)));
