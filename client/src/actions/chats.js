import apiClient from '../utils/axios-with-auth';
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
	apiURL
} from '../constants';

const userChatDataSuccess = (payload) => ({
	payload,
	type: USERS_CHAT_DATA_LOADING_DATA_SUCCESS
});

const newChatDataSuccess = (payload) => ({
	payload,
	type: USERS_CHAT_ADD_OWN_CHAT
});

const userChatDataFailure = (error) => ({
	error,
	type: USERS_CHAT_DATA_LOADING_DATA_FAILURE
});

const userChatDataLoading = () => ({
	type: USERS_CHAT_DATA_LOADING
});

const clearChatState = () => ({
	type: USERS_CHAT_RESET_STATE
});

const chatData = (payload) => ({
	payload,
	type: USER_CHAT_DATA_DETAIL
});

const messagesData = (payload) => ({
	payload,
	type: USER_CHAT_SET_MESSAGES
});

const clearMessages = () => ({
	type: USER_CHAT_CLEAR_MESSAGES
});

const newMessageDataSuccess = (payload) => ({
	payload,
	type: USER_CHAT_ADD_MESSAGE
});

const saveRecivedMessage = (payload) => ({
	payload,
	type: USER_CHAT_RECIVED_MESSAGE
});

// eslint-disable-next-line consistent-return

export const getUsersChatData = ({ take, skip, search }) => async (dispatch) => {
	dispatch(userChatDataLoading());
	try {
		const { data } = await apiClient.get(`${apiURL}/api/v1/chats`, {
			take,
			skip,
			search: search
		});
		dispatch(userChatDataSuccess({ data }));

		return data;
	} catch (error) {
    dispatch(userChatDataFailure(error.response.data.message));
	}
};

export const setMessagesData = (chat_id, search) => async (dispatch) => {
	dispatch(userChatDataLoading());
	dispatch(clearMessages());
	try {
		const { data } = await apiClient.get(`${apiURL}/api/v1/messages`, {
			chat_id,
			search
		});
		dispatch(messagesData({ data }));
	} catch (error) {
		console.log(error);
	}
};

export const setChatData = (data) => (dispatch) => {
	dispatch(chatData(data));
};

export const createChat = parameters => async dispatch => {
	dispatch(userChatDataLoading());
	console.log(parameters)
	try {
		const { data } = await apiClient.post(`${apiURL}/api/v1/chats`, parameters);
		dispatch(newChatDataSuccess(data));
	} catch (error) {
		dispatch(userChatDataFailure(error.message));
	}
};

// eslint-disable-next-line unicorn/consistent-function-scoping
export const resetChatState = () => (dispatch) => {
	dispatch(clearChatState());
};

export const resetMessages = () => (dispatch) => {
	dispatch(clearMessages());
};

export const sendMessage = (parameters) => async (dispatch) => {
	dispatch(userChatDataLoading());
	try {
		const { data } = await apiClient.post(`${apiURL}/api/v1/messages`, parameters);
		dispatch(newMessageDataSuccess(data));
	} catch (error) {
		console.log(error);
	}
};

export const saveMessage = (message) => async (dispatch) => {
	await dispatch(saveRecivedMessage(message));
};
