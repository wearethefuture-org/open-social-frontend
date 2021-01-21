import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import emojii from 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useSelector } from 'react-redux';
import style from './chats-dialogs.module.scss';
import avatar from '../../../assets/avatar.png';
import Messages from './messages';
import { connect } from 'react-redux';
import { sendMessage, saveMessage } from '../../../actions/chats';
import io from 'socket.io-client';
import textData from '../../../utils/lib/languages';
import MessageSearchPanel from '../messages-search/messages-search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

let socket;

const ChatsDialogs = ({ chat, sendMessage, saveMessage, dialogText }) => {
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [message, SetMessage] = useState('');
  const lang = useSelector(store => store.menu.lang);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
      socket.on('message', message => {
        saveMessage(message);
      });
    }
  }, []);

  const {
    chatsPage: { dialog },
  } = textData;

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title={dialog.emojiTitle[lang]}
        emoji="point_up"
        onSelect={emoji => SetMessage(message + emoji.native)}
      />
    );
  }

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  function createMessage(event) {
    event.preventDefault();
    if (message.length) {
      const parameters = {
        text: message,
        chat_id: chat.chatOption.id,
      };
      sendMessage(parameters);
      SetMessage('');
    }
  }

  if (chat.isLoading) {
    return <div>LOADING...</div>;
  }

  if (!chat.chatOption.id) {
    return (
      <div className={style.wrapper}>
        <header className={style.headerInfo}>
          <div className={style.user}>
            <div className={style.userName}>
              <span className={style.infoMessage}>
                {dialog.selectChatTopTitle[lang]}
              </span>
            </div>
          </div>
        </header>
        <div className={style.messagesWrapper}>
          <span className={style.infoMessage}>{dialog.selectChatBottomTitle[lang]}</span>
        </div>
        <div className={style.formLine} />
      </div>
    );
  }

  return (
    <div className={style.wrapper}>
      <MessageSearchPanel />
      <header>
        <div className={style.user}>
          <a href="">
            <img src={avatar} alt="not found" />
          </a>
          <div className={style.userName}>
            <a href="" className={style.name}>
              <span>
                {chat.chatOption.partner.firstName}{' '}
                {chat.chatOption.partner.lastName}
              </span>
            </a>
            <span className={style.lastTime}>last online 5 hours ago</span>
          </div>
        </div>
        <div className={style.buttons}>
          <AttachFileIcon />
          <MoreVertIcon />
        </div>
      </header>

      <Messages />

      <div className={style.formLine} />
      <div className={style.formWrapper}>
        <button className={style.dropUpButton} />
        <form onSubmit={createMessage}>
          <textarea
            name=""
            id=""
            rows="1"
            placeholder={dialog.inputPlaceholder[lang]}
            value={message}
            onChange={event => SetMessage(event.target.value)}
            onKeyPress={event =>
              event.key === 'Enter' ? createMessage(event) : null
            }
          />
          {emojiPicker}
          <button className={style.smileButton} onClick={triggerPicker} />
          <button type="submit" className={style.sendButton} />
        </form>

        <div className="dropUp">
          <img src="./img/Icon File.png" alt="" />
          <img src="./img/Icon Photo.png" alt="" />
          <img src="./img/Icon Video.png" alt="" />
        </div>
      </div>
    </div>
  );
};

ChatsDialogs.propTypes = {
  chat: PropTypes.object,
  sendMessage: PropTypes.func,
  saveMessage: PropTypes.func,
};

ChatsDialogs.whyDidYouRender = true;

const mapStateToProps = state => ({
  chat: state.userChats,
});

export default connect(
  mapStateToProps,
  { sendMessage, saveMessage },
)(withStyles(style, emojii)(React.memo(ChatsDialogs)));
