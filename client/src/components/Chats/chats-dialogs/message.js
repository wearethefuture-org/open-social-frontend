import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import style from './message.module.scss';
import avatar from '../../../assets/avatar.png';
import checkmark from '../../../assets/chat/checkmark.svg';
import moment from 'moment';
import { connect } from 'react-redux';

function Message({ user, message }) {

	let isSentByCurrentUser = false;

	if(user.id === message.owner_id) {
		isSentByCurrentUser = true;
	}

	let messageTime;  
	messageTime = moment(message.createdAt).fromNow();

	return (
		isSentByCurrentUser
			? (
				<div className={style.sended}>
					<div className={style.message}>
						<button className={style.messageMenuSended}></button>
						<div className={style.blockSended}>
							<span className={style.textSended}>{message.text}</span>
						</div>
						<img src={checkmark} alt=""></img>
					</div>
					<span className={style.timeSended}>{messageTime}</span>
				</div>
			) 
			: (
				<div className={style.recived}>
					<div className={style.message}>
						<a href=""><img src={avatar} alt="" className={style.messageAvatar}></img></a>
						<div className={style.blockRecived}>
							<span className={style.textRecived}>{message.text}</span>
						</div>
						<button className={style.messageMenuRecived}></button>
					</div>
					<span className={style.timeRecived}>{messageTime}</span>  
				</div>
			)

	//   <div className={style.timeLine}>
	//     <div className={style.line}></div>
	//     <span className={style.lastTime}>3 days ago</span>
	//     <div className={style.line}></div>
	//   </div>
	//   </React.Fragment>
	);
}

Message.propTypes = {
	user: PropTypes.object,
	message: PropTypes.object,
};

const mapStateToProps = state => ({
	user: state.userProfile,
});

export default connect(
	mapStateToProps,
	null
) (withStyles(style)(React.memo(Message)));
