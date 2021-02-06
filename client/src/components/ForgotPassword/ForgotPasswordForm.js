import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import InputField from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import styles from './ForgotPasswordForm.scss';
import { loginPage } from '../../utils/lib/languages.json';

const ForgotPasswordForm = ({ handleSubmit, change, type }) => {
  useStyles(styles);

  useEffect(() => {
    change('type', type);
  });

  const lang = useSelector(({ menu: { lang } }) => lang);
  const title =
    type === 'email'
      ? loginPage.forgotPassword.email[lang]
      : loginPage.forgotPassword.password[lang];
  const placeHolder =
    type === 'email'
      ? loginPage.inputs.email.placeholder[lang]
      : loginPage.inputs.password.placeholder[lang];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={type}>{title}</label>
      <Field
        id={type}
        name={type}
        component={InputField}
        validate={
          type === 'email' ? VALIDATION_RULES.EMAIL : VALIDATION_RULES.PASSWORD
        }
        type={type}
        description={type}
        placeholder={placeHolder}
      />
      <button className={styles.submitButton} type="submit">
        {loginPage.forgotPassword.send[lang]}
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default reduxForm({ form: 'resetPwd' })(ForgotPasswordForm);
