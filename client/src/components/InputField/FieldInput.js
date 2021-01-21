import React from 'react';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import FormControl from 'react-bootstrap/FormControl';
import styles from './FieldInput.scss';

const FieldInput = ({
  input: { value, onChange, onBlur, name },
  meta: { touched, error },
  type,
  description,
  placeholder,
  id,
  as,
  children,
  ...props
}) => {
  const showError = touched && error;

  return (
    <div className={styles.inputWrap}>
      <FormControl
        id={id}
        className={showError ? styles.InputError : styles.fieldDefault}
        name={name}
        onBlur={onBlur}
        type={type}
        as={as}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        description={description}
        props={props && ''}
      >
        {children}
      </FormControl>

      <>
        {showError ? (
          <span className={styles.TextError}>{`${description} ${error}`}</span>
        ) : (
          <span className={styles.TextHidden}>message</span>
        )}
      </>
    </div>
  );
};

FieldInput.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(bootstrap, styles)(FieldInput);
