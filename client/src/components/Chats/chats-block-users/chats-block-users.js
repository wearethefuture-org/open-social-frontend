/* eslint-disable promise/prefer-await-to-then */
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import {
  getUsersChatData,
  resetChatState,
  setChatData,
  setMessagesData,
} from '../../../actions/chats';
import apiServices from '../../../utils/axios-with-auth';
import Loader from '../../Loader/Loader';
import avatar from '../../../assets/avatar2.png';
import style from './chats-block-users.module.scss';
import textData from '../../../utils/lib/languages.json';

class ChatsBlockUsers extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    dispatchGetUsersChatData: PropTypes.func.isRequired,
    dispatchresetChatState: PropTypes.func.isRequired,
    // error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
  };

  state = {
    hasMore: true,
    skip: 0,
    take: 5,
    id: null,
  };

  componentDidMount() {
    const { dispatchGetUsersChatData } = this.props;
    const id = apiServices.userId();
    this.setState({ id });
    const { take, skip } = this.state;
    dispatchGetUsersChatData({ id, skip, take });
  }

  componentWillUnmount() {
    const { dispatchresetChatState } = this.props;
    dispatchresetChatState();
  }

  render() {
    const { data, isLoading, error, lang } = this.props;
    const { hasMore } = this.state;

    if (!data && error) {
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
      <div className={style.scrollMax}>
        <InfiniteScroll
          dataLength={data.length}
          next={this.getChats}
          hasMore={hasMore}
          className={style.scrollMax}
          endMessage={
            <p className={style.center}>
              <b>{textData.chatsPage.dialog.noMoreDialogs[lang]}</b>
            </p>
          }
        >
          <hr className={style.line} />
          <List dense className={style.root}>
            {data.map((value, index) => {
              return (
                <div
                  className={style.LinkToDialogs}
                  key={index}
                  to="./dialogsUser1"
                >
                  <ListItem button onClick={() => this.selectChat(value)}>
                    <ListItemAvatar>
                      <Avatar src={avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={value.name} />
                  </ListItem>
                  <hr className={style.line} />
                </div>
              );
            })}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
oldData
  getChats = async () => {
    let { take, skip, id } = this.state;
    const { dispatchGetUsersChatData, data: chats, error } = this.props;
    skip += take;
    await dispatchGetUsersChatData({ id, skip, take });
    if (chats) {
      this.setState({ hasMore: !!chats.length, skip });
    }
  };

  selectChat = data => {
    const { dispatchSetChatData, dispatchsetMessagesData } = this.props;
    dispatchSetChatData(data);
    dispatchsetMessagesData(data.id);
  };
}

ChatsBlockUsers.whyDidYouRender = true;
export default connect(
  ({
    userChats: { data, events, error, isLoading, chatOption },
    menu: { lang },
  }) => ({
    chatOption,
    data,
    error,
    events,
    isLoading,
    lang,
  }),
  {
    dispatchGetUsersChatData: getUsersChatData,
    dispatchSetChatData: setChatData,
    dispatchresetChatState: resetChatState,
    dispatchsetMessagesData: setMessagesData,
  },
)(withStyles(style)(React.memo(ChatsBlockUsers)));
