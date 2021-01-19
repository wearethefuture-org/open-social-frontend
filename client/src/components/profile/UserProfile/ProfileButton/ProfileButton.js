/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Button from 'react-bootstrap/Button';
import withStyles from 'isomorphic-style-loader/withStyles';
// import { style } from 'typestyle';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './ProfileButton.scss';

export const ProfileButton = ({ iconLeft, name, iconRight }) => {
  return (
    <Button variant="secondary" className={styles.ProfileButton}>
      {iconLeft} {name} {iconRight}
    </Button>
  );
};

ProfileButton.propTypes = {
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  name: PropTypes.string.isRequired,
};

ProfileButton.whyDidYouRender = true;

export default withStyles(styles)(React.memo(ProfileButton));
