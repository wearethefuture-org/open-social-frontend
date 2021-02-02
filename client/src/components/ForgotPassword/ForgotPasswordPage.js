import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import history from '../../history';
import styles from './ForgotPasswordPage.scss';

const ForgotPasswordPage = () => {
  useStyles(styles);

  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = email => {
    console.log(email);
  };

  const userId = history.location.pathname.replace('/forgot-password/', '');

  return (
    <div className={styles.container}>
      <div>
        <h1>Забыли пароль?</h1>
      </div>
      {success ? (
        <div>
          <h2>Пароль успешно изменен!</h2>
        </div>
      ) : (
        <div>
          {reset ? (
            <ResetPasswordForm onSubmit={handleSubmit} />
          ) : (
            <ForgotPasswordForm onSubmit={handleSubmit} />
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
