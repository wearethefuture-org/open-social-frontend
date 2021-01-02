import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useSelector } from 'react-redux';
import s from './Chats.scss';
import ChatsDialogs from './chats-dialogs/chats-dialogs';
import ChatsNav from './chats-nav/chats-nav';
import textData from '../../utils/lib/languages';
import ModalContainer from "../Modal/ModalContainer";

const Chats = () => {
  const lang = useSelector(store => store.menu.lang);
  const { chatsPage } = textData;
  return (
    <div className={s.container}>
      <div className={s.chatsHeader}>
        <h1>{chatsPage.title[lang]}</h1>
      </div>
      <div className={s.mainNav}>
        <ChatsNav />
      </div>
      <ChatsDialogs />
      <ModalContainer />
    </div>
  );
};

Chats.whyDidYouRender = true;
export default withStyles(s)(React.memo(Chats));
