import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FieldInput from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import textData from '../../utils/lib/languages.json';

import s from './Login.scss';


const UserForm = ({ handleSubmit, submitText }) => {
  const lang = useSelector(store => store.menu.lang);
  const {
    loginPage,
    loginPage: { inputs },
  } = textData;

  return (
    <Form onSubmit={handleSubmit} className={s.loginForm}>
      <Form.Group className={s.formGroup}>
        <Form.Label htmlFor="email" className={s.label}>
          {inputs.email.label[lang]}
        </Form.Label>
        <Field
          id="email"
          name="email"
          component={FieldInput}
          type="email"
          page="fieldDefault"
          // placeholder={inputs.email.placeholder[lang]}
          description="Email"
          validate={VALIDATION_RULES.EMAIL}
        />
      </Form.Group>
      <Form.Group className={s.formGroup}>
        <Form.Label htmlFor="password" className={s.label}>
          {inputs.password.label[lang]}
        </Form.Label>
        <Field
          id="password"
          name="password"
          component={FieldInput}
          type="password"
          // placeholder={inputs.password.placeholder[lang]}
          description="Password"
          validate={VALIDATION_RULES.PASSWORD}
        />
      </Form.Group>
      <div className={s.submitRow}>
        <Form.Group className={s.formGroup}>
          <input className={s.checkbox} id="remember" type="checkbox" />
          <Form.Label htmlFor="remember" className={s.label}>
            {loginPage.rememberUser[lang]}
          </Form.Label>
        </Form.Group>

        <Form.Group className={s.formGroup}>
          <Button className={s.submitButton} type="submit">
            {submitText || 'Submit'}
          </Button>
          <img className={s.submitArrow} src={require('../../assets/submitArrow.svg')} alt="arrow"/>
        </Form.Group>
      </div>

    </Form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default withStyles(bootstrap)(
  reduxForm({ form: 'user-form' })(UserForm),
);
