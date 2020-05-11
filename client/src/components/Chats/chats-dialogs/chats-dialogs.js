import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './chats-dialogs.module.scss';

const ChatsDialogs = () => {
  return <div className={s.dialogs}>dialogs</div>;
};
ChatsDialogs.whyDidYouRender = true;
export default withStyles(s)(React.memo(ChatsDialogs));
