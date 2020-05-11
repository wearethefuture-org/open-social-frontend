import { connect } from 'react-redux';
import { compose } from 'redux';
import { setUsers } from '../../reducers/user';
import Chats from './Chats';

const mapStateToProps = state => {
  return {
    users: state.user.users,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { setUsers },
  ),
)(Chats);
