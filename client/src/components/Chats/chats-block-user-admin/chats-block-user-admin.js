import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';
import style from './chats-block-user-admin.module.scss';
import dumpImg from '../../../assets/chat/noImg.png';
import { hideMobileListUsers } from "../../../actions/chats";
import CloseIcon from '@material-ui/icons/Close';

const ChatsBlockUserAdmin = ({
  firstName,
  lastName,
  userName,
  avatar,
  error,
  isLoading,
  hideMobileListUsers,
}) => {
  if (error) {
    return <p className="mb-0">{error.message}</p>;
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	};

	return (
		<div className={style.blockUserAdmin}>
      <CloseIcon className={style.closeIcon} onClick={hideMobileListUsers} />
      <Avatar className={style.avatar} alt={userName} />
      {/* src={`http://${avatar.url}`} */}
      <div>
        <h4>{` ${firstName} ${lastName}`}</h4>
      </div>
		</div>
	);
};

ChatsBlockUserAdmin.propTypes = {
  // eslint-disable-next-line react/require-default-props
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
  error: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  hideMobileListUsers: PropTypes.func.isRequired,
};

ChatsBlockUserAdmin.whyDidYouRender = true;

export default connect(
  ({
    userProfile: { firstName, lastName, userName, avatar, error, isLoading },
  }) => ({
    avatar,
    error,
    firstName,
    isLoading,
    lastName,
    userName,
  }),
  { hideMobileListUsers },
)(withStyles(style)(React.memo(ChatsBlockUserAdmin)));
