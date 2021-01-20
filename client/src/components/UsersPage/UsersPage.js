import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { connect } from 'react-redux';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import s from './UsersPage.scss';
import User from './User/User';
import Loader from '../Loader/Loader';
import UserSearchPanel from './UserSearchPanel/UserSearchPanel';
import textData from '../../utils/lib/languages.json';

class UsersPage extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        lastName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      offset: 0,
      perPage: 5,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  pageCount() {
    const { data } = this.props;
    const { perPage } = this.state;
    return Math.ceil(data.length / perPage);
  }

  receivedData() {
    const { data } = this.props;
    const { offset, perPage } = this.state;
    const slice = data.slice(offset, offset + perPage);
    return slice.map(u => <User key={u.id} user={u} />);
  }

  handlePageClick = e => {
    const currentPage = e.selected;
    const offset = currentPage * this.state.perPage;

    this.setState(
      {
        currentPage,
        offset,
      },
      () => {
        this.receivedData();
      },
    );
  };

  componentDidMount() {
    this.receivedData();
    this.pageCount();
  }

  render() {
    const { error, isLoading, lang } = this.props;
    const { usersPage } = textData;

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
      <div className={s.wrapper}>
        <div className={s.heading}>
          <div className={s.title}>
            <h3>{usersPage.title[lang]}</h3>
          </div>
          <div className={s.containerSearch}>
            <UserSearchPanel />
          </div>
        </div>
        <hr className={s.line} />
        {this.receivedData()}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={this.pageCount()}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={s.pagination}
          activeClassName={s.active}
        />
      </div>
    );
  }
}

UsersPage.whyDidYouRender = true;
export default connect(
  ({ users: { data, error, isLoading }, menu: { lang } }) => ({
    data,
    error,
    isLoading,
    lang,
  }),
)(withStyles(bootstrap, s)(React.memo(UsersPage)));
