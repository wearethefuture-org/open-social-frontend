import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './chats-nav.module.scss';
import ChatsBlockUserAdmin from '../chats-block-user-admin/chats-block-user-admin';
import ChatSearchPanel from '../chats-search/chats-search';
import ChatsBlockUsers from '../chats-block-users/chats-block-users';
import ChatsAddDialog from '../chats-add-dialog/chats-add-dialog';

const ChatsNav = () => {
	return (
		<div className={s.navBlock}>
			<ChatsBlockUserAdmin />
			<ChatSearchPanel />
			<ChatsAddDialog />
			<ChatsBlockUsers />
		</div>
	);
};
ChatsNav.whyDidYouRender = true;
export default withStyles(s)(React.memo(ChatsNav));
