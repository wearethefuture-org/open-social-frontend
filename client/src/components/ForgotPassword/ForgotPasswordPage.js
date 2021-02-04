import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useStyles from 'isomorphic-style-loader/useStyles';
import ForgotPasswordForm from './ForgotPasswordForm';
import history from '../../history';
import { apiURL } from '../../constants/index';
import styles from './ForgotPasswordPage.scss';
import { loginPage } from '../../utils/lib/languages.json';

const ForgotPasswordPage = () => {
  useStyles(styles);

  const lang = useSelector(({ menu: { lang } }) => lang);

  const [link, setLink] = useState('');
  const [userId, setUserId] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Получение ID из строки запроса
    const url =
      history.location.pathname.length === 16
        ? '/forgot-password'
        : '/forgot-password/';

    const id = history.location.pathname.replace(url, '');
    setUserId(id);

    // Проверка ID в базе
    const validateId = async id => {
      try {
        await axios.post(`${apiURL}/api/v1/auth/forgot`, {
          idPwdReset: id,
        });
      } catch (e) {
        history.push('/');
      }
    };

    validateId(id);
  }, []);

  const handleSubmit = async credentials => {
    credentials.idPwdReset = userId;
    // В зависимости от credentials.type будет по разному обрабатываться на сервере
    try {
      const { data } = await axios.post(
        `${apiURL}/api/v1/auth/forgot`,
        credentials,
      );
      if (data) {
        setLink(data);
      }

      if (data === 'Password change success') {
        setSuccess(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>{loginPage.forgotPassword[lang]}</h1>
      </div>
      {success ? (
        <div>
          <h2>{loginPage.passwordSuccessChange[lang]}</h2>
        </div>
      ) : (
        <div>
          {!userId && (
            <ForgotPasswordForm onSubmit={handleSubmit} type="email" />
          )}
          {userId && (
            <ForgotPasswordForm onSubmit={handleSubmit} type="password" />
          )}
        </div>
      )}
      {link && <h3 className={styles.link}>{link}</h3>}
    </div>
  );
};

export default ForgotPasswordPage;
