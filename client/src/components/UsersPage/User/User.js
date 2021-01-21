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
import textData from '../../../utils/lib/languages.json';

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
              <OwnChatButton partnerId={id} />
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
  { setUserData },
)(withStyles(s)(React.memo(User)));
