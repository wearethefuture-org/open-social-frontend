/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';
import style from './chats-block-user-admin.module.scss';
import avatarAdmin from '../../../assets/avatar1.png';

class ChatsBlockUserAdmin extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  };

  render() {
    const { firstName, lastName, userName, isLoading, error } = this.props;
    if (error) {
      return <p className="mb-0">{error}</p>;
    }

    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    return (
      <div className={style.blockUserAdmin}>
        <div>
          <Avatar className={style.avatar} alt={userName} src={avatarAdmin} />
          <div>
            {firstName} {lastName}
          </div>
        </div>
      </div>
    );
  }
}

ChatsBlockUserAdmin.whyDidYouRender = true;

export default connect(({ userChats: { firstName, lastName, userName } }) => ({
  firstName,
  lastName,
  userName,
}))(withStyles(style)(React.memo(ChatsBlockUserAdmin)));
