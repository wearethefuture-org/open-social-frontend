import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './TotalStatic.scss';
import textData from '../../../utils/lib/languages.json';

const TotalStatic = ({ totalCount, countSelect, startDate, endDate }) => {
  const lang = useSelector(store => store.menu.lang);
  const name = useSelector(store => store.analytics.filter.name);
  const {
    analyticsPage: { chart },
  } = textData;

  return (
    <>
      <div>
        <div>{chart[name].total[lang]}</div>
        <div className={s.amount}>{totalCount}</div>
        <br />
        <div>{chart[name].select[lang]}</div>
        <span
          className={s.date}
        >{`${startDate} ${chart[name].selectDate[lang]} ${endDate}`}</span>
        <div className={s.amount}>{countSelect}</div>
      </div>
    </>
  );
};

TotalStatic.propTypes = {
  countSelect: PropTypes.number,
  endDate: PropTypes.string,
  startDate: PropTypes.string,
  totalCount: PropTypes.number,
};

TotalStatic.defaultProps = {
  countSelect: 0,
  endDate: 'end date',
  startDate: 'start date',
  totalCount: 0,
};

TotalStatic.whyDidYouRender = true;

export default connect(
  ({
    analytics: {
      analytics: { totalCount, countSelect },
      filter: { startDate, endDate },
    },
  }) => ({
    countSelect,
    endDate,
    startDate,
    totalCount,
  }),
)(withStyles(s)(React.memo(TotalStatic)));
