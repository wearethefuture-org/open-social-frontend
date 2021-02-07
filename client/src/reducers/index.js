import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menu from './menu';
import user from './user';
import confirm from './confirm';
import userChats from './chats';
import userAuth from './user-auth';
import userProfile from './profile';
import users from './users';
import analytics from './analytics';

export default combineReducers({
  analytics,
  confirm,
  form: formReducer,
  menu,
  user,
  userAuth,
  userChats,
  userProfile,
  users,
});
