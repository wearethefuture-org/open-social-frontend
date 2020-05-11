import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './chats-nav.module.scss';
import ChatsBlockUserAdmin from '../chats-block-user-admin/chats-block-user-admin';
import ChatsSearch from '../chats-search/chats-search';
import ChatsBlockUsers from '../chats-block-users/chats-block-users';

const ChatsNav = () => {
  return (
    <div className={s.navBlock}>
      <ChatsBlockUserAdmin />
      <ChatsSearch />
      <ChatsBlockUsers />
    </div>
  );
};
ChatsNav.whyDidYouRender = true;
export default withStyles(s)(React.memo(ChatsNav));
