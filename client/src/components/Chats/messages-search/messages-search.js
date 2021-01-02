import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessagesData } from '../../../actions/chats';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import s from './messages-search.scss';
import textData from '../../../utils/lib/languages.json'

class MessageSearchPanel extends Component {
	static propTypes = {
		setMessagesData: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  };
	state = {
		search: ''
	};

	handleOnInputChange = _.debounce((search) => {
		this.setState({ search: search });
		this.props.setMessagesData(this.props.chatOption.id, search);
	}, 700);

	render() {
    const { lang } = this.props;
    return (
			<div className={s.SearchMessages}>
				<input
					className={s.SearchInputMessages}
					type="text"
					value={this.state.query}
					placeholder={textData.chatsPage.dialog.searchPlaceholder[lang]}
					onChange={(e) => this.handleOnInputChange(e.target.value)}
				/>
				<SearchIcon />
			</div>
		);
	}
}

MessageSearchPanel.whyDidYouRender = true;
export default connect(
	({ userChats: { data, error, isLoading, chatOption }, menu: { lang } }) => ({
		data,
		error,
		isLoading,
		chatOption,
    lang
	}),
	{ setMessagesData }
)(withStyles(s)(React.memo(MessageSearchPanel)));
