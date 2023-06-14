const USER_ACTION_TYPES = require("./user.actionTypes");

const FETCH_USER_START = () => {
  return { type: USER_ACTION_TYPES.SET_USER_START };
};

const FETCH_USER_SUCCESS = (user) => {
  return { type: USER_ACTION_TYPES.SET_USER_SUCCESS, payload: user };
};

const FETCH_USER_FAILED = (err) => {
  return { type: USER_ACTION_TYPES.SET_USER_FAILED, payload: err };
};

const SET_USER_LOGOUT = () => {
  return { type: USER_ACTION_TYPES.SET_USER_LOGOUT };
};

const FETCH_LOGGEDINUSER_START = () => {
  return { type: USER_ACTION_TYPES.SET_LOGGED_IN_USER_START };
};

const FETCH_LOGGEDINUSER_SUCCESS = (user) => {
  return { type: USER_ACTION_TYPES.SET_LOGGED_IN_USER_SUCCESS, payload: user };
};

const FETCH_LOGGEDINUSER_FAILED = (err) => {
  return { type: USER_ACTION_TYPES.SET_LOGGED_IN_USER_Failed, payload: err };
};

const SET_LOGGEDIN_USER_LOGOUT = () => {
  return { type: USER_ACTION_TYPES.SET_LOGGED_IN_USER_LOGOUT };
};

module.exports = {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  SET_USER_LOGOUT,
  SET_LOGGEDIN_USER_LOGOUT,
  FETCH_LOGGEDINUSER_START,
  FETCH_LOGGEDINUSER_SUCCESS,
  FETCH_LOGGEDINUSER_FAILED,
  SET_LOGGEDIN_USER_LOGOUT,
};
