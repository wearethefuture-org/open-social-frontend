import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import textData from '../../../utils/lib/languages.json';
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
    );
  }
}

ChatsAddDialog.whyDidYouRender = true;

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(hideModal()),
    openModal: modalParameters => dispatch(showModal(modalParameters)),
  };
};

export default connect(
  ({ menu: { lang } }) => ({ lang }),
  mapDispatchToProps,
)(withStyles(style)(React.memo(ChatsAddDialog)));
