/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import s from './EditProfile.scss';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import { editProfile } from '../../actions/profile';
import history from '../../history';
import apiClient from '../../utils/axios-with-auth';
import textData from '../../utils/lib/languages.json';

class EditProfilePage extends React.Component {
  static propTypes = {
    editProfile: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  };

  handleSubmit = async data => {
    const { editProfile } = this.props;
    await editProfile(data);
    history.push(`/profile${apiClient.userId()}`);
  };

  render() {
    const { lang } = this.props;
    const {
      editProfilePage: { title },
    } = textData;

    return (
      <div className={s.form}>
        <h3 className={s.heading}>{title[lang]}</h3>
        {process.env.BROWSER && (
          <EditProfileForm onSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}
EditProfilePage.whyDidYouRender = true;

export default connect(
  ({ menu: { lang } }) => ({
    lang,
  }),
  { editProfile },
)(withStyles(bootstrap, s)(React.memo(EditProfilePage)));
