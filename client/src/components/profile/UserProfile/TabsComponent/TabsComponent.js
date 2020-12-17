import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Col, Container } from 'react-bootstrap';
import reactStyle from 'react-tabs/style/react-tabs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import styles from './TabsComponent.scss';
import Link from '../../../Link';
import apiClient from '../../../../utils/axios-with-auth';
import textData from '../../../../utils/lib/languages.json';
import ProfilePrivate from '../ProfilePrivate/ProfilePrivate';

const TabsComponent = ({
  firstName,
  lastName,
  userName,
  email,
  birthdayDate,
  id,
  privateUser,
}) => {
  const lang = useSelector(store => store.menu.lang);
  //if id != our id AND privateUser on this user === true return false else true
  const privateStatus = !(id !== apiClient.userId() && privateUser === true);
  const {
    profilePage: { tabs, aboutData },
  } = textData;
  const dataObject = {
    userInformation: [
      { column: `${aboutData.username[lang]}`, value: `${userName}` },
      { column: `${aboutData.email[lang]}`, value: `${email}` },
      {
        column: `${aboutData.birthday[lang]}`,
        value: `${moment(birthdayDate).format('MM-DD-YYYY')}`,
      },
    ],
  };

  if (privateStatus) {
    return (
      <>
        {privateStatus}
        <Tabs className={styles.TabsWrapper}>
          <TabList>
            <div>
              <Tab id="aboutMe">{tabs.about[lang]}</Tab>
              {/* <Tab id="additionalInfo">{tabs.additional[lang]}</Tab>
            <Tab id="credits">{tabs.credits[lang]}</Tab> */}
              <div className={styles.IconsWrapper}>
                {id === apiClient.userId() && (
                  <>
                    <span className={styles.Edit}>
                      <Link to="/edit-profile">
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Link>
                    </span>
                    {/* <span className={styles.Bell}>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <span className={styles.Cog}>
                    <FontAwesomeIcon icon={faCog} />
                  </span> */}
                  </>
                )}
              </div>
            </div>
          </TabList>
          <TabPanel className={styles.TabPanel}>
            <h4>{` ${firstName} ${lastName}`}</h4>
            {dataObject.userInformation.map(item => {
              return (
                <Container key={item.column}>
                  <div className={styles.TabsItemRow}>
                    <div className={styles.TabsItemCol}>{item.column}:</div>
                    <div>{item.value}</div>
                  </div>
                </Container>
              );
            })}
          </TabPanel>
          <TabPanel className={styles.TabPanel}>
            <h4>Additional info</h4>
          </TabPanel>
          <TabPanel className={styles.TabPanel}>
            <h4>Credits</h4>
          </TabPanel>
        </Tabs>
      </>
    );
  }
  return <ProfilePrivate />;
};

TabsComponent.defaultProps = {
  birthdayDate: null,
};

TabsComponent.propTypes = {
  birthdayDate: PropTypes.string,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  privateUser: PropTypes.bool.isRequired,
};

TabsComponent.whyDidYouRender = true;
export default connect(
  ({
    userProfile: { firstName, lastName, userName, email, birthdayDate, id, privateUser },
  }) => ({
    birthdayDate,
    email,
    firstName,
    id,
    lastName,
    userName,
    privateUser,
  }),
)(withStyles(styles, reactStyle)(React.memo(TabsComponent)));
