import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Col, Container } from 'react-bootstrap';
import reactStyle from 'react-tabs/style/react-tabs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './TabsComponent.scss';

const TabsComponent = ({
  firstName,
  lastName,
  userName,
  email,
  birthdayDate,
  role,
}) => {
  const dataObject = {
    userInformation: [
      {
        column: 'Description',
        value:
          ' Many people think that Lorem Ipsum is a ' +
          'pseudo-Latin set of words taken from the ceiling, but this is not entirely true. ' +
          'Its roots go back to one fragment of classical latin 45 years BC, that' +
          'is, more than two millennia ago.',
      },
      { column: 'Username', value: `${userName}` },
      { column: 'Email', value: `${email}` },
      {
        column: 'Birthday date',
        value: `${moment(birthdayDate).format('MM-DD-YYYY')}`,
      },
    ],
  };

  return (
    <>
      <Tabs className={styles.TabsWrapper}>
        <TabList>
          <div>
            <Tab id="aboutMe">About me</Tab>
            <Tab id="additionalInfo">Additional info</Tab>
            <Tab id="credits">Credits</Tab>
            <div className={styles.IconsWrapper}>
              {role === 'user' ? (
                <>
                  <span className={styles.Bell}>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <span className={styles.Cog}>
                    <FontAwesomeIcon icon={faCog} />
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </TabList>
        <TabPanel className={styles.TabPanel}>
          <h4>{` ${firstName} ${lastName}`}</h4>
          {dataObject.userInformation.map(item => {
            return (
              <Container key={item.column}>
                <Row className={styles.TabsItemRow}>
                  <Col lg={3} md={3} sm={12} className={styles.TabsItemCol}>
                    {item.column}:
                  </Col>
                  <Col lg={9} md={9} sm={12}>
                    {item.value}
                  </Col>
                </Row>
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
};

TabsComponent.defaultProps = {
  birthdayDate: null,
};

TabsComponent.propTypes = {
  birthdayDate: PropTypes.string,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

TabsComponent.whyDidYouRender = true;
export default connect(
  ({
    userProfile: { firstName, lastName, userName, email, birthdayDate, role },
  }) => ({
    birthdayDate,
    email,
    firstName,
    lastName,
    role,
    userName,
  }),
)(withStyles(styles, reactStyle)(React.memo(TabsComponent)));
