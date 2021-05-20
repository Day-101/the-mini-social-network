import Cookies from "js-cookie";

const initialState = {
  userID: Cookies.get('id'),
  token: Cookies.get('token'),
  data: []
};

const useReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NEW_USER_SUCCESS':
      return {
        ...state,
        userID: action.data.user.id,
        token: action.data.jwt,
        data: action.data
      }
      default:
        return state;
  };
};

export default useReducer;
