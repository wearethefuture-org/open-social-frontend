import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
// import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Link from '../Link/Link';
import UserForm from './LoginForm';
import history from '../../history';

import { login } from '../../actions/user';
import textData from '../../utils/lib/languages.json';

import s from './Login.scss';
// import banner from "../../assets/images_banner/loginBackground.png";
// import banner from '../../assets/images_banner/withoutLogo.png';

import RatingButtons from '../RatingButtons';

class LoginPage extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
  };

  handleSubmit = async data => {
    const { setUser } = this.props;
    await setUser(data);
    history.push(`/`);
  };

  useQuery = () => {
    return new URLSearchParams(window.location.search);
  };

  render() {
    const { message, lang } = this.props;
    const { loginPage } = textData;
    const successSignup = this.useQuery().has('registrationSuccess')
      ? loginPage.successSignUp[lang]
      : false;

    return (
      <div className={s.wrapper}>
        <div className={s.bannerWrap}>
          <img
            className={s.logo}
            src={require('../../assets/logos/big-logo.png')}
            alt="logo"
          />
        </div>
        <div className={s.interfaceWrap}>
          <div className={s.interface}>
            {successSignup && <Alert variant="info">{successSignup}</Alert>}
            {message && <Alert variant="info">{message}</Alert>}
            <h3 className={s.heading}>{loginPage.title[lang]}</h3>
            {process.env.BROWSER && (
              <div className={s.formWrap}>
                <UserForm
                  onSubmit={this.handleSubmit}
                  submitText={loginPage.submitButton[lang]}
                />
                <div className={s.links}>
                  <Link to="/forgotPassword" className={s.link}>
                    {loginPage.forgotPassword[lang]}
                  </Link>
                  <Link to="/signup" className={s.link}>
                    {loginPage.signup[lang]}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <RatingButtons />
        </div>
      </div>
    );
  }
}

export default withStyles(bootstrap, s)(
  connect(
    ({ user: { message }, menu: { lang } }) => ({ lang, message }),
    {
      setUser: login,
    },
  )(LoginPage),
);
