import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.scss';

const Loader = () => (
  <div className={styles.overlay}>
    <div className={styles.spinner}>
      <Spinner
        animation="grow"
        variant="primary"
        className={styles.spinnerStyle}
      />
    </div>
  </div>
);

export default withStyles(styles)(Loader);
