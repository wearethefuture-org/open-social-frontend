import React from 'react';
import { Field, reduxForm } from 'redux-form';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';

const ForgotPasswordForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="email">E-mail</Form.Label>
        <Field
          id="email"
          name="email"
          component={InputField}
          validate={VALIDATION_RULES.EMAIL}
          type="email"
          description="Email"
          placeholder="E-mail"
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default withStyles(bootstrap)(
  reduxForm({ form: 'email' })(ForgotPasswordForm),
);
