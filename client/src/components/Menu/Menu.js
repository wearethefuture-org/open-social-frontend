import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isomorphicCookie from 'isomorphic-cookie';
import withStyles from 'isomorphic-style-loader/withStyles';
import classNames from 'classnames';
import Hamburger from 'react-hamburger-menu';
import Button from 'react-bootstrap/Button';
import MenuItem from './MenuItem/MenuItem';
import { signout } from '../../actions/user';

import s from './Menu.scss';
import profile from '../../assets/profile.svg';
import about from '../../assets/about.svg';
import login from '../../assets/login.svg';
import signup from '../../assets/signup.svg';
import chats from '../../assets/chats.svg';

class Menu extends React.Component {
  static propTypes = {
    currentTab: PropTypes.string.isRequired,
    signoutUser: PropTypes.func.isRequired,
  };

  state = {
    isMenuOpen: false,
  };

  render() {
    const { currentTab, signoutUser } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <div className={s.menu}>
        <div className={s.menuHamburger}>
          <Hamburger
            isOpen={isMenuOpen}
            menuClicked={this.onMenuClick}
            width={25}
            height={15}
            color="#eeeeee"
          />
        </div>
        <div
          className={classNames(s.menuItems, {
            [s.menuItemsActive]: isMenuOpen,
          })}
        >
          {isomorphicCookie.load('token')
            ? this.menuItems.map(item => (
                <MenuItem
                  key={item.text}
                  item={item}
                  isActive={currentTab === item.text}
                  closeMenu={this.onMenuClick}
                />
              ))
            : this.menuItemsOffline.map(item2 => (
                <MenuItem
                  key={item2.text}
                  item={item2}
                  isActive={currentTab === item2.text}
                  closeMenu={this.onMenuClick}
                />
              ))}
          {isomorphicCookie.load('token') && (
            <Button
              variant="outline-light"
              className={s.signout}
              onClick={signoutUser}
            >
              Exit
            </Button>
          )}
        </div>
      </div>
    );
  }

  onMenuClick = () => {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  };

  menuItems = [
    {
      icon: profile,
      path: '',
      text: 'Profile',
    },
    {
      icon: about,
      path: 'about',
      text: 'About',
    },
    {
      icon: chats,
      path: 'chats',
      text: 'Chats',
    },
  ];

  menuItemsOffline = [
    {
      icon: login,
      path: 'login',
      text: 'Login',
    },
    {
      icon: signup,
      path: 'signup',
      text: 'SignUp',
    },
  ];
}

export default connect(
  ({ menu: { currentTab } }) => ({ currentTab }),
  { signoutUser: signout },
)(withStyles(s)(Menu));
