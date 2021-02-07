import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
// import normalizeCss from "normalize.css";

import Link from '../Link';
import logo from '../../assets/logos/logo.svg';
import twitter from '../../assets/social_icons/twitter.svg';
import instagram from '../../assets/social_icons/instagram.svg';
import facebook from '../../assets/social_icons/facebook.svg';
import s from './footer.scss';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={s.credo}>
        <p>New waves of synergy of your IT products</p>
      </div>
      <div className={s.menu}>
        <Link to="/">
          <img src={twitter} alt="twitter" />
        </Link>
        <Link to="/">
          <img src={instagram} alt="instagram" />
        </Link>
        <Link to="/">
          <img src={facebook} alt="facebook" />
        </Link>
      </div>
    </footer>
  );
}
Footer.propTypes = {};

export default withStyles(s)(Footer);
