import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ProfilePhoto.scss';
import defaultUserPhoto from '../../../../assets/default_user_profile.jpg';

const ProfilePhoto = ({
  isDefaultPhotoDisplayed,
  imgSource,
  changeProfilePhotoHandler,
  loadPhoto,
  role,
}) => {
  const userPhoto = isDefaultPhotoDisplayed ? (
    <img src={defaultUserPhoto} alt="profile" className={styles.UserImg} />
  ) : (
    <img src={imgSource} className={styles.UserImg} alt="profile" />
  );

  return (
    <div className={classNames(styles.ProfileBackgroundImages, 'card')}>
      {userPhoto}
      <div className="text-center">
        {role === 'user' ? (
          <>
            <label
              className={styles.ChangePhoto}
              onClick={changeProfilePhotoHandler}
            >
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
        ) : null}
      </div>
    </div>
  );
};

ProfilePhoto.propTypes = {
  changeProfilePhotoHandler: PropTypes.func.isRequired,
  imgSource: PropTypes.string.isRequired,
  isDefaultPhotoDisplayed: PropTypes.bool.isRequired,
  loadPhoto: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

ProfilePhoto.whyDidYouRender = true;

export default connect(({ userProfile: { role } }) => ({
  role,
}))(withStyles(styles)(React.memo(ProfilePhoto)));
