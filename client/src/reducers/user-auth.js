import { SET_USER_AUTH } from '../constants';

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return { data: action.data };
    default:
      return state;
  }
};
