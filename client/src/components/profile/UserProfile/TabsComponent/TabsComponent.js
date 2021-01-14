import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Container } from 'react-bootstrap';
import reactStyle from 'react-tabs/style/react-tabs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCog,
  faUserEdit,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import styles from './TabsComponent.scss';
import Link from '../../../Link';
import apiClient from '../../../../utils/axios-with-auth';
import textData from '../../../../utils/lib/languages.json';

const TabsComponent = ({
  firstName,
  lastName,
  userName,
  email,
  birthdayDate,
  id,
  createdAt,
  countChats,
  countMessages,
}) => {
  const lang = useSelector(store => store.menu.lang);
  const {
    profilePage: { tabs, aboutData, analyticData },
  } = textData;
  const dataObject = {
    analytics: [
      {
        column: `${analyticData.registrationDate[lang]}`,
        value: `${moment(createdAt).format('MM-DD-YYYY')}`,
      },
      { column: `${analyticData.сreatedСhats[lang]}`, value: `${countChats}` },
      {
        column: `${analyticData.сreatedMessages[lang]}`,
        value: `${countMessages}`,
      },
    ],
    userInformation: [
      { column: `${aboutData.username[lang]}`, value: `${userName}` },
      { column: `${aboutData.email[lang]}`, value: `${email}` },
      {
        column: `${aboutData.birthday[lang]}`,
        value: `${moment(birthdayDate).format('MM-DD-YYYY')}`,
      },
    ],
  };

  return (
    <>
      <Tabs className={styles.TabsWrapper}>
        <TabList>
          <div>
            <Tab id="aboutMe">{tabs.about[lang]}</Tab>
            <Tab id="additionalInfo" className={styles.hidden}>
              {tabs.additional[lang]}
            </Tab>
            <Tab id="credits" className={styles.hidden}>
              {tabs.credits[lang]}
            </Tab>
            <Tab id="analytics">{tabs.analytics[lang]}</Tab>
            <div className={styles.IconsWrapper}>
              {id === apiClient.userId() && (
                <>
                  <span className={styles.Edit}>
                    <Link to="/edit-profile">
                      <FontAwesomeIcon icon={faUserEdit} />
                    </Link>
                  </span>
                  <span className={styles.Analytic}>
                    <Link to="/analytic-profile">
                      <FontAwesomeIcon icon={faChartBar} />
                    </Link>
                  </span>
                  <span className={(styles.Bell, styles.hidden)}>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <span className={(styles.Cog, styles.hidden)}>
                    <FontAwesomeIcon icon={faCog} />
                  </span>
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
        <TabPanel className={styles.TabPanel}>
          {dataObject.analytics.map(item => {
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
      </Tabs>
    </>
  );
};

TabsComponent.defaultProps = {
  birthdayDate: null,
};

TabsComponent.propTypes = {
  birthdayDate: PropTypes.string,
  countChats: PropTypes.number.isRequired,
  countMessages: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

TabsComponent.whyDidYouRender = true;
export default connect(
  ({
    userProfile: {
      firstName,
      lastName,
      userName,
      email,
      birthdayDate,
      id,
      createdAt,
      counters: { countAllUsers, countChats, countMessages },
    },
  }) => ({
    birthdayDate,
    countAllUsers,
    countChats,
    countMessages,
    createdAt,
    email,
    firstName,
    id,
    lastName,
    userName,
  }),
)(withStyles(styles, reactStyle)(React.memo(TabsComponent)));
