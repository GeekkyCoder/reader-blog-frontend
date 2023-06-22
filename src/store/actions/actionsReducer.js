const { ACTION_ACTION_TYPES } = require("./actions.actionsTypes");

const INITIAL_STATE = {
  isLoading: false,
  isSnackBarOpen: false,
  snackBarMessage: "",
  error: null,
};

const actionReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_ACTION_TYPES.SET_SNACKBAR_OPEN:
      return {
        ...state,
        isLoading: false,
        isSnackBarOpen: payload,
      };
    case ACTION_ACTION_TYPES.SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackBarMessage: payload,
      };
    case ACTION_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default actionReducer