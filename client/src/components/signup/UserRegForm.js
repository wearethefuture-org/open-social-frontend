import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Button, InputGroup, Row, Col, Form } from 'react-bootstrap';
import FieldInput from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import textData from '../../utils/lib/languages.json';

const UserForm = ({ handleSubmit, submitText }) => {
  const lang = useSelector(store => store.menu.lang);
  const {
    signupPage: { inputs },
  } = textData;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.firstName.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="firstName"
            component={FieldInput}
            type="text"
            placeholder={inputs.firstName.placeholder[lang]}
            description="first name"
            validate={VALIDATION_RULES.FIRST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.lastName.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="lastName"
            component={FieldInput}
            type="text"
            placeholder={inputs.lastName.placeholder[lang]}
            description="last name"
            validate={VALIDATION_RULES.LAST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.userName.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Field
              name="userName"
              component={FieldInput}
              type="text"
              placeholder={inputs.userName.placeholder[lang]}
              description="user name"
              required
              validate={VALIDATION_RULES.USERNAME}
            />
          </InputGroup>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.email.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="email"
            component={FieldInput}
            type="email"
            placeholder={inputs.email.placeholder[lang]}
            description="email"
            validate={VALIDATION_RULES.EMAIL}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.birthdayDate.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="birthdayDate"
            component={FieldInput}
            type="date"
            placeholder={inputs.birthdayDate.placeholder[lang]}
            description="birthday date"
            validate={VALIDATION_RULES.BIRTH_DAY}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.password.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="password"
            component={FieldInput}
            type="password"
            placeholder={inputs.password.placeholder[lang]}
            description="password"
            validate={VALIDATION_RULES.PASSWORD}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {inputs.confirmPassword.label[lang]}
        </Form.Label>
        <Col sm={8}>
          <Field
            name="Confirm password"
            component={FieldInput}
            type="password"
            placeholder={inputs.confirmPassword.placeholder[lang]}
            description="confirm password"
            validate={VALIDATION_RULES.CONFIRM_PASSWORD}
          />
        </Col>
      </Form.Group>
      <Button variant="danger" type="submit">
        {submitText || 'Submit'}
      </Button>
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
