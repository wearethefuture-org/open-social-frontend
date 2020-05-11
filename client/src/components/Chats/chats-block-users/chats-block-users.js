/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import Loader from '../../Loader/Loader';
import avatar from '../../../assets/avatar2.png';
import style from './chats-block-users.module.scss';

class ChatsBlockUsers extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        avatarId: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { data, isLoading, error } = this.props;
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
      <div>
        <hr className={style.line} />
        <List dense className={style.root}>
          {data.map(value => {
            return (
              <div className={style.LinkToDialogs} to="./dialogsUser1">
                <ListItem key={value} button>
                  <ListItemAvatar>
                    <Avatar src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${value.lastName} ${value.firstName}`}
                  />
                </ListItem>
                <hr className={style.line} />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}
ChatsBlockUsers.whyDidYouRender = true;

export default connect(({ userChats: { data, events, error, isLoading } }) => ({
  data,
  error,
  events,
  isLoading,
}))(withStyles(style)(React.memo(ChatsBlockUsers)));
