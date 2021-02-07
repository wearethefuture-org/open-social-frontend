import React from 'react';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Button, InputGroup, Row, Col, Form } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import FieldInput from '../InputField/FieldInput';
import { VALIDATION_RULES } from '../../utils/validators/ValidationRules';
import s from './EditProfileForm.scss';
import Link from '../Link';
import apiClient from '../../utils/axios-with-auth';
import textData from '../../utils/lib/languages.json';

const EditProfileForm = ({ handleSubmit }) => {
  const lang = useSelector(store => store.menu.lang);
  const {
    editProfilePage: { inputs },
  } = textData;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column={4}>{inputs.firstName.label[lang]}</Form.Label>
        <Col sm={8}>
          <Field
            name="firstName"
            component={FieldInput}
            type="text"
            placeholder={inputs.firstName.placeholder[lang]}
            description="First name"
            validate={VALIDATION_RULES.FIRST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>{inputs.lastName.label[lang]}</Form.Label>
        <Col sm={8}>
          <Field
            name="lastName"
            component={FieldInput}
            type="text"
            placeholder={inputs.lastName.placeholder[lang]}
            description="Last name"
            validate={VALIDATION_RULES.LAST_NAME}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>{inputs.userName.label[lang]}</Form.Label>
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
              description="Username"
              required
              validate={VALIDATION_RULES.USERNAME}
            />
          </InputGroup>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column={4}>{inputs.email.label[lang]}</Form.Label>
        <Col sm={8}>
          <Field
            name="email"
            component={FieldInput}
            type="email"
            placeholder={inputs.email.placeholder[lang]}
            description="Email"
            validate={VALIDATION_RULES.EMAIL}
          />
        </Col>
      </Form.Group>
      <div className={s.buttonClose}>
        <Link to={`/profile${apiClient.userId()}`}>
          <Button variant="cancel">{inputs.cancelButton[lang]}</Button>
        </Link>
      </div>
      <div className={s.buttonSave}>
        <Button variant="save" type="submit">
          <div className={s.textSave}>{inputs.submitButton[lang]}</div>
        </Button>
      </div>
    </Form>
  );
};

EditProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
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
