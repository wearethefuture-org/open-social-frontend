import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const handleSubmit = email => {
    console.log(email);
  };
  return (
    <div>
      <div>
        <h1>Забыли пароль?</h1>
      </div>
      <div>
        <ForgotPasswordForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
