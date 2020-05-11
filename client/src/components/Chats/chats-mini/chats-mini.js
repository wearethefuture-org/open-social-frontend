/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import s from './chats-mini.module.scss';
import ChatsDialogs from '../chats-dialogs/chats-dialogs';
import ChatsBlockUsers from '../chats-block-users/chats-block-users';
import ChatsSearch from '../chats-search/chats-search';

const ChatsMini = () => {
  const [openChat, setOpen] = React.useState(false);
  const [openDialogs, setOpenDialogs] = React.useState(false);

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handleOpenChat = () => {
    setOpen(true);
  };
  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handleCloseChat = () => {
    setOpen(false);
  };
  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handleOpenDialogs = () => {
    setOpenDialogs(true);
  };
  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handleCloseDialogs = () => {
    setOpenDialogs(false);
  };
  return (
    <div className={s.miniDialogs}>
      {!openChat ? (
        <Button onClick={handleOpenChat}>Chats</Button>
      ) : (
        <div>
          <Button onClick={handleCloseChat}>Chats</Button>
          <div className={s.miniDialogsWindow}>
            {openDialogs && (
              <div
                className={s.buttonBackToChatUsers}
                onClick={handleCloseDialogs}
              >
                <ArrowBackIosIcon />
              </div>
            )}
            <div
              className={s.buttonCloseWindowMiniChat}
              onClick={handleCloseChat}
            >
              <CloseIcon />
            </div>
            <div>
              <ChatsSearch />
            </div>
            <div onClick={handleOpenDialogs}>
              <ChatsBlockUsers />
            </div>
            {openDialogs && <ChatsDialogs />}
          </div>
        </div>
      )}
    </div>
  );
};
ChatsMini.whyDidYouRender = true;
export default withStyles(s)(React.memo(ChatsMini));
