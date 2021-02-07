import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { getUsersChatData } from '../../../actions/chats';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import s from './chats-search.module.scss';
import textData from '../../../utils/lib/languages.json';
import apiClient from '../../../utils/axios-with-auth';

class ChatSearchPanel extends Component {
  static propTypes = {
    getUsersChatData: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  };
  state = {
    search: '',
    id: null,
  };

  componentDidMount() {
    const id = apiClient.userId();
    this.setState({ id });
  }

  handleOnInputChange = _.debounce(search => {
    const { id } = this.state;
    this.setState({ search: search });
    this.props.getUsersChatData({ id, search });
  }, 700);

  render() {
    const { lang } = this.props;
    return (
      <div className={s.SearchDialogs}>
        <SearchIcon className={s.SearchIcon} />
        <input
          className={s.SearchInputDialog}
          type="text"
          value={this.state.query}
          placeholder={textData.general.searchPlaceholder[lang]}
          onChange={e => this.handleOnInputChange(e.target.value)}
        />
      </div>
    );
  }
}

ChatSearchPanel.whyDidYouRender = true;
export default connect(
  ({ userChats: { data, error, isLoading }, menu: { lang } }) => ({
    data,
    error,
    isLoading,
    lang,
  }),
  { getUsersChatData },
)(withStyles(s)(React.memo(ChatSearchPanel)));
