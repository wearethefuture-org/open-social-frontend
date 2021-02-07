import React from 'react';
import Message from './message';
import withStyles from 'isomorphic-style-loader/withStyles';
import style from './messages.module.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import textData from '../../../utils/lib/languages.json';

function Messages() {
  const lang = useSelector(store => store.menu.lang);

  const messages = useSelector(store => store.userChats.messages);
  if (!messages.length) {
    return (
      <div className={style.firstMessage}>
        <span>{textData.chatsPage.dialog.noMessageTitle[lang]}</span>
      </div>
    );
  }

  return (
    <ScrollToBottom className={style.messages}>
      {messages.map(message => (
        <div key={message.id}>
          <Message message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default withStyles(style)(React.memo(Messages));
