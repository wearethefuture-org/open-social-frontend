import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './TotalStatic.scss';
import textData from '../../../utils/lib/languages.json';

const TotalStatic = ({ countAllUsers, countSelectUsers, countSelectChats }) => {
  const lang = useSelector(store => store.menu.lang);
  const name = useSelector(store => store.userProfile.filterAnalytic.name);
  const {
    analyticPage: { chart },
  } = textData;

  return (
    <>
      <div>
        <div>{chart[name].total[lang]}</div>
        <div className={s.amount}>{countAllUsers}</div>
        <hr />
        <div>{chart[name].select[lang]}</div>
        <div className={s.amount}>
          {countSelectUsers || countSelectChats || 0}
        </div>
      </div>
    </>
  );
};

TotalStatic.propTypes = {
  countAllUsers: PropTypes.number,
  countSelectChats: PropTypes.number,
  countSelectUsers: PropTypes.number,
};

TotalStatic.defaultProps = {
  countAllUsers: null,
  countSelectChats: null,
  countSelectUsers: null,
};

TotalStatic.whyDidYouRender = true;

export default connect(
  ({
    userProfile: {
      analytics: { countAllUsers, countSelectUsers, countSelectChats },
    },
  }) => ({
    countAllUsers,
    countSelectChats,
    countSelectUsers,
  }),
)(withStyles(s)(React.memo(TotalStatic)));
