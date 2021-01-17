import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import s from './AnalyticProfile.scss';
import Chart from './Chart/Chart';
import TotalStatic from './TotalStatic/TotalStatic';
import AnalyticProfileForm from './AnalyticProfileForm/AnalyticProfileForm';
import { getDataAnalytics } from '../../actions/analytics';
import textData from '../../utils/lib/languages.json';
import Loader from '../Loader/Loader';

class AnalyticProfile extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    getDataAnalytics: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
  };

  handleSubmit = async data => {
    // eslint-disable-next-line no-shadow
    const { getDataAnalytics } = this.props;
    await getDataAnalytics(data);
  };

  render() {
    const { lang, error, isLoading } = this.props;
    const {
      analyticsPage: { filter },
    } = textData;

    if (error) {
      return <p className="mb-0">{error}</p>;
    }
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    return (
      <>
        <Container maxWidth="lg" className={s.container}>
          <Typography variant="h3">{filter.title[lang]}</Typography>
          <div className={s.form}>
            <AnalyticProfileForm onSubmit={this.handleSubmit} />
          </div>
          <hr className={s.line} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Paper>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper className={s.totalStatistic}>
                <TotalStatic />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
AnalyticProfile.whyDidYouRender = true;

export default connect(
  ({ menu: { lang }, analytics: { error, isLoading } }) => ({
    error,
    isLoading,
    lang,
  }),
  { getDataAnalytics },
)(withStyles(bootstrap, s)(React.memo(AnalyticProfile)));
