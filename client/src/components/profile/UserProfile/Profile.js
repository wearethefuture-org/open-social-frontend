import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faCaretDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Card, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './Profile.scss';
// eslint-disable-next-line css-modules/no-unused-class
import stylesButton from './ProfileButton/ProfileButton.scss';
// eslint-disable-next-line no-unused-vars
import { ProfileButton } from './ProfileButton/ProfileButton';
import 'react-tabs/style/react-tabs.css';
import TabsComponent from './TabsComponent/TabsComponent';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';
import OwnChatButton from './OwnChat/OwnChat';
import apiClient from '../../../utils/axios-with-auth';
import defaultUserPhoto from '../../../assets/default_user_profile.jpg';
import textData from '../../../utils/lib/languages.json';
import history from '../../../history';

class Profile extends Component {
  static propTypes = {
    avatar: PropTypes.shape({
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
    id: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    lang: PropTypes.string.isRequired,
  };

  render() {
    const {
      id: { id },
      lang,
    } = this.props;
    const { profilePage } = textData;
    return (
      <Container className={styles.UserProfile}>
        <Card className={styles.ProfileCard}>
          <Row>
            <Col lg={5} md={5} sm={12}>
              <ProfilePhoto
                imgSource={this.getUserAvatar()}
                loadPhoto={this.loadPhoto}
              />
              <div>
                {/*     <ProfileButton
                  className={stylesButton.ProfileButton}
                  name={profilePage.buttons.connect[lang]}
                />
                <ProfileButton
                  className={stylesButton.ProfileButton}
                  name={profilePage.buttons.message[lang]}
                  iconLeft={
                    <FontAwesomeIcon
                      className={stylesButton.Icon}
                      icon={faEnvelope}
                    />
                  }
                />
                <ProfileButton
                  className={stylesButton.ProfileButton}
                  name={profilePage.buttons.review[lang]}
                  iconRight={
                    <FontAwesomeIcon
                      className={stylesButton.Icon}
                      icon={faCaretDown}
                    />
                  }
                /> */}
                {id === apiClient.userId() && (
                  <OwnChatButton nameButton={profilePage.buttons.chat[lang]} />
                )}
              </div>
            </Col>
            <Col lg={7} md={7} sm={12}>
              <TabsComponent />
            </Col>
          </Row>
        </Card>

        {/*      <Container className={styles.FollowersContainer}>
          <Card className={styles.CardBody}>
            <Row className={styles.RowContainer}>
              <Col lg={4} md={4} sm={12}>
                <Card className={styles.FollowersCard}>
                  <Row className={styles.FollowersRow}>
                    <Col className={styles.Followers}>
                      <h3>203</h3>
                      <p>{profilePage.activities.followers[lang]}</p>
                    </Col>
                    <Col className={styles.Followers}>
                      <h3>5</h3>
                      <p>{profilePage.activities.chats[lang]}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container> */}
      </Container>
    );
  }

  getUserAvatar() {
    // eslint-disable-next-line react/destructuring-assignment
    const { avatar } = this.props.avatar;
    if (avatar === null) {
      return defaultUserPhoto;
    }
    return avatar.url;
  }

  loadPhoto = event => {
    const photo = event.target.files[0];
    apiClient.saveUserProfilePhoto(photo);
    history.push(`/`);
  };
}

Profile.whyDidYouRender = true;

export default connect(
  ({ userProfile: avatar, userProfile: id, menu: { lang } }) => ({
    avatar,
    id,
    lang,
  }),
)(withStyles(styles, stylesButton)(React.memo(Profile)));
