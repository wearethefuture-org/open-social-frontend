import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Profile from './UserProfile/Profile';

const ProfileContainer = props => {
  const { isLoading, error } = props;

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="mb-0">{error}</p>;
  }

  return <Profile />;
};

ProfileContainer.defaultProps = {
  error: '',
  isLoading: false,
};

ProfileContainer.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

ProfileContainer.whyDidYouRender = true;

export default connect(({ userProfile: { error, isLoading } }) => ({
  error,
  isLoading,
}))(withStyles()(React.memo(ProfileContainer)));
