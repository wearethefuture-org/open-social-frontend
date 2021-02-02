import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import useStyles from 'isomorphic-style-loader/useStyles';
import InputField from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import styles from './ForgotPasswordForm.scss';

const ForgotPasswordForm = ({ handleSubmit, change }) => {
  useStyles(styles);
  useEffect(() => {
    change('type', 'email');
  });
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="email">Введите ваш E-mail:</label>
      <Field
        id="email"
        name="email"
        component={InputField}
        validate={VALIDATION_RULES.EMAIL}
        type="email"
        description="Email"
        placeholder="E-mail"
      />
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default reduxForm({ form: 'email' })(ForgotPasswordForm);
