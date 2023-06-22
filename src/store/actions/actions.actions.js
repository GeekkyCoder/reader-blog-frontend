const { ACTION_ACTION_TYPES } = require("./actions.actionsTypes");

export const SET_IS_LOADING = () => {
  return { type: ACTION_ACTION_TYPES.SET_IS_LOADING };
};

export const SET_IS_SNACKBAR_OPEN = (bool) => {
  return { type: ACTION_ACTION_TYPES.SET_SNACKBAR_OPEN, payload: bool };
};

export const SET_SNACK_BAR_MESSAGE = (message) => {
  return { type: ACTION_ACTION_TYPES.SET_SNACKBAR_MESSAGE, payload: message };
};

export const SET_ERROR = (message) => {
  return { type: ACTION_ACTION_TYPES.SET_ERROR, payload: message };
};
