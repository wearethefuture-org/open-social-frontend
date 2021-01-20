import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isomorphicCookie from 'isomorphic-cookie';
import withStyles from 'isomorphic-style-loader/withStyles';
import Tab from './MenuItem/Tab';
import { signout } from '../../actions/user';
import { setLang } from '../../actions/lang';
import textData from '../../utils/lib/languages.json';

import s from './Menu.scss';
import profile from '../../assets/profile.svg';
import about from '../../assets/about.svg';
import login from '../../assets/login.svg';

import chats from '../../assets/chats.svg';
import users from '../../assets/users.svg';
import analytics from '../../assets/analytics.svg';

const Menu = ({ currentTab, signoutUser, setCurrentLang, lang }) => {
  const { menuButtons } = textData;

  const baseItemsToken = [
    {
      icon: about,
      name: 'about',
      path: 'about',
      text: menuButtons.about.label[lang],
      type: 'button',
    },
    {
      icon: analytics,
      name: 'analytics',
      path: 'analytics',
      text: menuButtons.analytics.label[lang],
      type: 'button',
    },
    {
      icon: chats,
      name: 'chats',
      path: 'chats',
      text: menuButtons.chats.label[lang],
      type: 'button',
    },
    {
      icon: users,
      name: 'users',
      path: 'users',
      text: menuButtons.users.label[lang],
      type: 'button',
    },
    {
      icon: null,
      items: [
        { path: null, text: menuButtons.signOut.label[lang], type: 'signout' },
        { path: '/', text: menuButtons.MyProfile.label[lang], type: 'router' },
      ],
      name: 'profile',
      text: menuButtons.profile.label[lang],
      type: 'select',
    },
    {
      icon: null,
      items: [
        { path: null, text: 'uk', type: 'setLang' },
        { path: null, text: 'ru', type: 'setLang' },
        { path: null, text: 'en', type: 'setLang' },
      ],
      name: 'Lang',
      text: lang,
      type: 'select',
    },
  ];

  const baseItems = [
    {
      icon: null,
      items: [
        {
          path: 'signUp',
          text: menuButtons.signUp.label[lang],
          type: 'router',
        },
        { path: 'login', text: menuButtons.login.label[lang], type: 'router' },
      ],
      name: 'profile',
      text: menuButtons.profile.label[lang],
      type: 'select',
    },
    {
      icon: null,
      items: [
        { path: null, text: 'uk', type: 'setLang' },
        { path: null, text: 'ru', type: 'setLang' },
        { path: null, text: 'en', type: 'setLang' },
      ],
      name: 'Lang',
      text: lang,
      type: 'select',
    },
  ];

  const handleClick = (type, value) => {
    switch (type) {
      case 'setLang':
        setCurrentLang(value);
        localStorage.setItem('chatLang', value);
        break;
      case 'signout':
        signoutUser();
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.wrapper}>
      {isomorphicCookie.load('token')
        ? baseItemsToken.map(item => (
            <Tab
              key={item.text}
              item={item}
              onClick={handleClick}
              currentTab={currentTab}
            />
          ))
        : baseItems.map(item => (
            <Tab
              key={item.text}
              item={item}
              onClick={handleClick}
              currentTab={currentTab}
            />
          ))}
    </div>
  );
};

Menu.propTypes = {
  currentTab: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  setCurrentLang: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default connect(
  ({ menu: { currentTab, lang } }) => ({ currentTab, lang }),
  {
    setCurrentLang: setLang,
    signoutUser: signout,
  },
)(withStyles(s)(Menu));
