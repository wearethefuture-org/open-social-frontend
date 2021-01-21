import {
  USERS_CHAT_DATA_LOADING,
  USERS_CHAT_DATA_LOADING_DATA_SUCCESS,
  USERS_CHAT_DATA_LOADING_DATA_FAILURE,
  USERS_CHAT_ADD_OWN_CHAT,
  USERS_CHAT_RESET_STATE,
  USER_CHAT_DATA_DETAIL,
  USER_CHAT_SET_MESSAGES,
  USER_CHAT_CLEAR_MESSAGES,
  USER_CHAT_ADD_MESSAGE,
  USER_CHAT_RECIVED_MESSAGE,
  SHOW_MOBILE_LIST_USERS,
  HIDE_MOBILE_LIST_USERS,
} from '../constants';

const initialState = {
<<<<<<< HEAD
  chatOption: { id: '' },
  data: [],
  error: [],
  isLoading: true,
  messages: [],
  visibleMobileMenu: false,
=======
	data: [],
	error: [],
	isLoading: true,
	chatOption: { id: '' },
	messages: []
>>>>>>> 7a88e705a3e561750fc7ca6f219ed9b4530272f0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_CHAT_DATA_LOADING_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: '',
        isLoading: false,
      };
    case USERS_CHAT_DATA_LOADING:
      return { ...state };
    case USERS_CHAT_ADD_OWN_CHAT:
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
      };
    case USERS_CHAT_DATA_LOADING_DATA_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case USERS_CHAT_RESET_STATE:
      return { ...state, data: [] };
    case USER_CHAT_DATA_DETAIL:
      return { ...state, chatOption: { ...action.payload } };
    case USER_CHAT_SET_MESSAGES:
      return {
        ...state,
        isLoading: false,
        messages: [...state.messages, ...action.payload.data],
      };
    case USER_CHAT_CLEAR_MESSAGES:
      return { ...state, messages: [] };
    case (USER_CHAT_ADD_MESSAGE, USER_CHAT_RECIVED_MESSAGE):
      return {
        ...state,
        isLoading: false,
        messages: [...state.messages, action.payload],
      };
    case SHOW_MOBILE_LIST_USERS:
      return { ...state, visibleMobileMenu: true };
    case HIDE_MOBILE_LIST_USERS:
      return { ...state, visibleMobileMenu: false };
    default:
      return state;
  }
};
