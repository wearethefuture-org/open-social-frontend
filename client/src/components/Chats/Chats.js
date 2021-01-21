import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import s from './Chats.scss';
import ChatsDialogs from './chats-dialogs/chats-dialogs';
import ChatsNav from './chats-nav/chats-nav';
import textData from '../../utils/lib/languages';
<<<<<<< HEAD
import { hideMobileListUsers, showMobileListUsers } from '../../actions/chats';
=======
import ModalContainer from "../Modal/ModalContainer";
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0

class Chats extends Component {
  static propTypes = {
    visibleMobileMenu: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    showMobileListUsers: PropTypes.func.isRequired,
    hideMobileListUsers: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.hideMobileListUsers();
  }

  render() {
    const { chatsPage } = textData;
    const { visibleMobileMenu, lang } = this.props;
    const { showMobileListUsers } = this.props;
    const navClass = visibleMobileMenu ? s.navShow : s.mainNav;
    return (
      <div className={s.container}>
        <div className={s.chatsHeader}>
          <MenuIcon className={s.iconHamburger} onClick={showMobileListUsers} />
          <h1>{chatsPage.title[lang]}</h1>
        </div>
        <div className={navClass}>
          <ChatsNav />
        </div>
        <ChatsDialogs />
      </div>
<<<<<<< HEAD
    );
  }
=======
      <ChatsDialogs />
      <ModalContainer />
    </div>
  );
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0
};

Chats.whyDidYouRender = true;
export default connect(
  ({ userChats: { visibleMobileMenu }, menu: { lang } }) => ({
    visibleMobileMenu,
    lang,
  }),
  { showMobileListUsers, hideMobileListUsers },
)(withStyles(s)(React.memo(Chats)));
