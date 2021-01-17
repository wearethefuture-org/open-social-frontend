import React from 'react';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import FieldInput from '../../InputField/FieldInput';
import { VALIDATION_RULES } from '../../../utils/validators/ValidationRules';
import s from './AnalyticProfileForm.scss';
import textData from '../../../utils/lib/languages.json';

const AnalyticProfileForm = ({ handleSubmit }) => {
  const lang = useSelector(store => store.menu.lang);
  const {
    analyticsPage: {
      filter: { selectName, selectStep, startDate, endDate },
    },
  } = textData;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className={s.formGroupSelect}>
        <Form.Label>{selectName[lang]}</Form.Label>
        <Field
          name="name"
          component={FieldInput}
          type="select"
          as="select"
          placeholder="Select name filter"
          description="Name filter"
        >
          <option value="users">Users</option>
          <option value="chats">Chats</option>
        </Field>
      </Form.Group>
      <Form.Group className={s.formGroupSelect}>
        <Form.Label>{selectStep[lang]}</Form.Label>
        <Field
          name="step"
          component={FieldInput}
          type="select"
          placeholder="Select step"
          description="Step"
          as="select"
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
        </Field>
      </Form.Group>
      <div className={s.GroupDate}>
        <Form.Group className={s.formGroupDate}>
          <Form.Label>{startDate[lang]}</Form.Label>
          <Field
            name="startDate"
            component={FieldInput}
            type="date"
            placeholder="Enter start date"
            description="Start date"
            validate={VALIDATION_RULES.START_DAY}
          />
        </Form.Group>
        <Form.Group className={s.formGroupDate}>
          <Form.Label>{endDate[lang]}</Form.Label>
          <Field
            name="endDate"
            component={FieldInput}
            type="date"
            placeholder="Enter end date"
            description="End date"
            validate={VALIDATION_RULES.END_DAY}
          />
        </Form.Group>
      </div>
      <div className={s.buttonSave}>
        <Button variant="save" type="submit">
          <div className={s.textSave}>OK</div>
        </Button>
      </div>
    </Form>
  );
};

AnalyticProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: {
      endDate: state.analytics.filter.endDate,
      name: state.analytics.filter.name,
      startDate: state.analytics.filter.startDate,
      step: state.analytics.filter.step,
    },
  };
};
export default connect(mapStateToProps)(
  reduxForm({ enableReinitialize: true, form: 'analytics-form' })(
    withStyles(bootstrap, s)(React.memo(AnalyticProfileForm)),
  ),
);
