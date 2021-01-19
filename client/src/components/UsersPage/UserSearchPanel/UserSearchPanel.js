/* eslint-disable no-magic-numbers */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import s from './UsersSearchPanel.scss';
import { getUsersWithParams } from '../../../actions/users';

class UserSearchPanel extends Component {
  static propTypes = {
    getUsersWithParams: PropTypes.func.isRequired,
  };

  handleOnInputChange = _.debounce(search => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getUsersWithParams({ search });
  }, 700);

  render() {
    return (
      <div>
        <div>
          <input
            className={s.searchPanelInput}
            type="text"
            // eslint-disable-next-line react/destructuring-assignment
            placeholder="Search..."
            onChange={event => this.handleOnInputChange(event.target.value)}
          />
          <SearchIcon fontSize="large" className={s.iconInput} />
        </div>
      </div>
    );
  }
}

UserSearchPanel.whyDidYouRender = true;
export default connect(
  ({ users: { data, error, isLoading } }) => ({
    data,
    error,
    isLoading,
  }),
  { getUsersWithParams },
)(withStyles(s)(React.memo(UserSearchPanel)));
