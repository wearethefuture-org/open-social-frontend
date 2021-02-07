/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { failConfirm } from '../../actions/confirm';
import { confirmThunk } from '../../reducers/confirm';
import history from '../../history';

import s from './confirm.module.scss';

class Confirm extends Component {
  static propTypes = {
    confirmThunk: PropTypes.func.isRequired,
    confirmation: PropTypes.string.isRequired,
    failConfirm: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userKey: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { userKey, id, confirmThunk, failConfirm } = this.props;
    if (typeof userKey !== 'undefined' && typeof id !== 'undefined') {
      confirmThunk(+id, userKey);
    } else {
      failConfirm();
    }
  }

  render() {
    const { confirmation } = this.props;
    const text =
      confirmation === 0
        ? 'wait for confirmation'
        : confirmation === 1
        ? 'Success Confirm'
        : 'Not Confirmed';
    if (confirmation === 1 || confirmation === 2) this.redirectLogin();
    return (
      <div className={s.confirm}>
        <h2> {text} </h2>
      </div>
    );
  }

  redirectLogin = () => {
    const TIME = 2000;
    setTimeout(() => history.push('/login'), TIME);
  };
}

const mapStateToProps = ({ confirm }) => {
  return {
    confirmation: confirm.confirmation,
  };
};
const mapDispatchToProps = {
  confirmThunk,
  failConfirm,
};

export default withStyles(s)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Confirm),
);
