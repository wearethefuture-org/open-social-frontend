import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import textData from '../../../../utils/lib/languages.json';
import styles from './ProfilePrivate.scss';

const ProfilePrivate = () => {
  const lang = useSelector(store => store.menu.lang);

  return (
    <div className={styles.ProfilePrivateContainer}>
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className={styles.ProfilePrivateIcon}
      />
      <br />
      {textData.profilePage.aboutData.private[lang]}
    </div>
  );
};

export default withStyles(styles)(React.memo(ProfilePrivate));
