import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import textData from '../../../utils/lib/languages.json';
<<<<<<< HEAD
import style from './chats-add-dialogs.scss';
import Link from '../../Link';

class ChatsAddDialog extends React.Component {
  render() {
    const { lang } = this.props;

    return (
      <Link
        className={style.writeButton}
        to='users'
      >
        {textData.chatsPage.dialog.addDialog[lang]}
      </Link>
=======
import { hideModal, showModal } from '../../../actions/modal';
import UsersPage from '../../UsersPage/UsersPage';
import style from './chats-add-dialogs.scss';

class ChatsAddDialog extends React.Component {
  render() {
    const { lang, openModal, closeModal } = this.props;

    return (
      <div>
        <button
          className={style.writeButton}
          onClick={() => {
            openModal({
              modalProps: {
                button: { onClick: () => closeModal() },
              },
              modalType: UsersPage,
            });
          }}
        >
          {textData.chatsPage.dialog.addDialog[lang]}
        </button>
      </div>
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0
    );
  }
}

ChatsAddDialog.whyDidYouRender = true;

<<<<<<< HEAD
export default connect(
  ({ menu: { lang } }) => ({ lang }),
=======
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(hideModal()),
    openModal: modalParameters => dispatch(showModal(modalParameters)),
  };
};

export default connect(
  ({ menu: { lang } }) => ({ lang }),
  mapDispatchToProps,
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0
)(withStyles(style)(React.memo(ChatsAddDialog)));
