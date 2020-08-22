import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessagesWithParams } from '../../../actions/chats';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import s from './messages-search.scss';

class MessageSearchPanel extends Component {
  static propTypes = {
    getMessagesWithParams: PropTypes.func.isRequired,
  };
  state = {
    search: '',
  };

  handleOnInputChange = _.debounce(search => {
    this.setState({ search: search });
    this.props.getMessagesWithParams({ search });
  }, 700);

  //   shouldComponentUpdate = (messages) => {
  //     messages.map(message => (
  //       <div key={message.id}>
  //         <Message message={message} />
  //       </div>
  //     ));
  //   };

  render() {
    return (
      <div className={s.SearchMessages}>
        <input
          className={s.SearchInputMessages}
          type="text"
          value={this.state.query}
          placeholder="Search in messages..."
          onChange={e => this.handleOnInputChange(e.target.value)}
        />
        <SearchIcon />
      </div>
      //</div>
      //      this.shouldComponentUpdate
      //</div>
    );
  }
}

MessageSearchPanel.whyDidYouRender = true;
export default connect(
  ({ userChats: { data, error, isLoading } }) => ({
    data,
    error,
    isLoading,
  }),
  { getMessagesWithParams },
)(withStyles(s)(React.memo(MessageSearchPanel)));
