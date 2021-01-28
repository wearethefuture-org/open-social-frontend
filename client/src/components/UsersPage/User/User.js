/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './User.scss';
import Link from '../../Link';
import UsersAvatar from '../../../assets/usersAvatar.png';
import OwnChatButton from '../../profile/UserProfile/OwnChat/OwnChat';
import { setUserData } from '../../../actions/profile';
import { createChat } from '../../../actions/chats';
import apiClient from '../../../utils/axios-with-auth';
import history from '../../../history';
import textData from '../../../utils/lib/languages.json';
import styles from '../../profile/UserProfile/ProfileButton/ProfileButton.scss';
import BorderColorIcon from '@material-ui/icons/BorderColor';

class User extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    setUserData: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.toUserProfile();
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setUserData({ id: null });
  }

  handleChatOpen = (id, firstName) => {
    const owner_id = apiClient.userId();
    const user = apiClient.user();

    const params = {
      name: `${user.firstName} - ${firstName}`,
      description: '',
      partner_id: id,
      owner_id,
    };

    this.props.createChat(params).then(() => history.push('/chats'));
  };

  render() {
    const {
      user: { firstName, lastName, id, avatar },
      lang,
    } = this.props;
    const { usersPage } = textData;
    return (
      <>
        <div className={s.userContainer}>
          <div onClick={() => this.toUserProfile(id)}>
            <Link to={`/profile${id}`} className={s.Link}>
              {avatar ? (
                <img
                  className={s.UsersAvatar}
                  src={avatar.url}
                  alt={UsersAvatar}
                />
              ) : (
                <img
                  className={s.UsersAvatarDefault}
                  src={UsersAvatar}
                  alt={UsersAvatar}
                />
              )}
              <span className={s.UsersName}>
                {firstName} {lastName}
              </span>
            </Link>
          </div>
          <div className={s.buttonAddWrite}>
            <div>
              <button type="button" className={s.buttonAdd}>
                {usersPage.addButton[lang]}
                <AddIcon />
              </button>
            </div>
            <div>
              {/* <OwnChatButton partnerId={id} /> */}
              <div
                className={styles.buttonMessage}
                onClick={() => this.handleChatOpen(id, firstName)}
              >
                <BorderColorIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>
        <hr className={s.line} />
      </>
    );
  }

  toUserProfile = id => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setUserData({ id });
  };
}

User.whyDidYouRender = true;
export default connect(
  ({ menu: { lang } }) => ({
    lang,
  }),
  { setUserData, createChat },
)(withStyles(s, styles)(React.memo(User)));
