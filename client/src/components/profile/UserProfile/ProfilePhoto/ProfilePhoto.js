import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ProfilePhoto.scss';
import apiClient from '../../../../utils/axios-with-auth';

const ProfilePhoto = ({ imgSource, loadPhoto, id }) => {
  const userPhoto = (
    <img src={imgSource} className={styles.UserImg} alt="profile" />
  );

  return (
    <div className={classNames(styles.ProfileBackgroundImages, 'card')}>
      {userPhoto}
      <div className="text-center">
        {id === apiClient.userId() && (
          <>
            <label className={styles.ChangePhoto}>
              <FontAwesomeIcon icon={faCamera} />
              <input
                type="file"
                name="addImage"
                id="addImage"
                accept="image/*"
                onChange={loadPhoto}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

ProfilePhoto.propTypes = {
  id: PropTypes.number.isRequired,
  imgSource: PropTypes.string.isRequired,
  loadPhoto: PropTypes.func.isRequired,
};

ProfilePhoto.whyDidYouRender = true;

export default connect(({ userProfile: { id } }) => ({
  id,
}))(withStyles(styles)(React.memo(ProfilePhoto)));
