import Cookies from "js-cookie";

const id = Cookies.get('id');

const initialState = {
  userID: id,
  token: Cookies.get('token'),
  data: [],
  check: id ? true : false
};

const useReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NEW_USER_SUCCESS':
      return {
        ...state,
        userID: action.data.user.id,
        token: action.data.jwt,
        data: action.data,
        check: action.check
      }
      default:
        return state;
  };
};

export default useReducer;
