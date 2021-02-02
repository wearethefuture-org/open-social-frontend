import React from 'react';
import { Field, reduxForm } from 'redux-form';
import useStyles from 'isomorphic-style-loader/useStyles';
import InputField from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import styles from './ForgotPasswordForm.scss';

const ResetPasswordForm = ({ handleSubmit }) => {
  useStyles(styles);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="password">Введите ваш новый пароль:</label>
      <Field
        id="password"
        name="password"
        component={InputField}
        validate={VALIDATION_RULES.PASSWORD}
        type="password"
        description="Password"
        placeholder="Password"
      />
      <button className={styles.submitButton} type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({ form: 'password' })(ResetPasswordForm);
