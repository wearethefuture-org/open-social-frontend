import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CustomTooltip.scss';

const CustomTooltip = ({
  active,
  payload,
  label,
  tooltipOne,
  tooltipSecond,
  startDate,
}) => {
  if (payload === null || typeof payload === 'undefined') return null;

  if (active) {
    return (
      <div className={s.customTooltip}>
        <div className={s.tooltipOne}>
          <span>{`${tooltipOne} ${label}`}</span>:{' '}
          <span className={s.spanValue}>{payload[0].value}</span>
        </div>
        <div className={s.tooltipSecond}>
          <span>{`${startDate} ${tooltipSecond} ${label}`}</span>:{' '}
          <span className={s.spanValue}>{payload[0].payload.sumCount}</span>
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.defaultProps = {
  label: null,
  payload: null,
};

CustomTooltip.propTypes = {
  // eslint-disable-next-line react/boolean-prop-naming
  active: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  payload: PropTypes.arrayOf(PropTypes.object),
  startDate: PropTypes.string.isRequired,
  tooltipOne: PropTypes.string.isRequired,
  tooltipSecond: PropTypes.string.isRequired,
};

export default withStyles(s)(React.memo(CustomTooltip));
