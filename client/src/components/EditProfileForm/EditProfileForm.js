import React from 'react';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Button, InputGroup, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import FieldInput from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import s from './EditProfileForm.scss';
import Link from '../Link';
import apiClient from '../../utils/axios-with-auth';

const EditProfileForm = ({ handleSubmit, submitText }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="formInput">
      <Form.Group as={Row}>
        <Form.Label column={4}>First name:</Form.Label>
        <Col sm={8}>
          <Field
            name="firstName"
            component={FieldInput}
            type="text"
            placeholder="Enter your new first name"
            description="First name"
            validate={VALIDATION_RULES.FIRST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>Last name:</Form.Label>
        <Col sm={8}>
          <Field
            name="lastName"
            component={FieldInput}
            type="text"
            placeholder="Enter your new last name"
            description="Last name"
            validate={VALIDATION_RULES.LAST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>Username:</Form.Label>
        <Col sm={8}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Field
              name="userName"
              component={FieldInput}
              type="text"
              placeholder="Enter your new userName"
              description="Username"
              required
              validate={VALIDATION_RULES.USERNAME}
            />
          </InputGroup>
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Row}>
        <Form.Label column={4}>Email</Form.Label>
        <Col sm={8}>
          <Field
            name="email"
            component={FieldInput}
            type="email"
            placeholder="Enter your new email"
            description="Email"
            validate={VALIDATION_RULES.EMAIL}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>Birth Date</Form.Label>
        <Col sm={8}>
          <Field
            name="birthdayDate"
            component={FieldInput}
            type="date"
            placeholder="Enter your birthdayDate"
            description="Birthday date"
            validate={VALIDATION_RULES.BIRTH_DAY}
          />
        </Col>
      </Form.Group>
      </ div>
      <div className={s.buttonClose}>
        <Link to={`/profile${apiClient.userId()}`}>
          <Button variant="cancel">Cancel</Button>
        </Link>
      </div>
      <div className={s.buttonSave}>
        <Button variant="save" type="submit">
          <div className={s.textSave}>{submitText || 'Submit'}</div>
        </Button>
      </div>
    </Form>
  );
};

EditProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: {
      birthdayDate: moment(state.userProfile.birthdayDate).format('YYYY-MM-DD'),
      email: state.userProfile.email,
      firstName: state.userProfile.firstName,
      lastName: state.userProfile.lastName,
      userName: state.userProfile.userName,
    },
  };
};
export default connect(mapStateToProps)(
  reduxForm({ enableReinitialize: true, form: 'edit-profile-form' })(
    withStyles(bootstrap, s)(React.memo(EditProfileForm)),
  ),
);
