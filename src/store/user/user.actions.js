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

const FETCH_ALL_USERS = (users) => {
  return {type:USER_ACTION_TYPES.SET_ALL_USERS,payload:users}
}

const FETCH_USER_FOLLOWERS = (followers) => {
  return {type:USER_ACTION_TYPES.SET_USER_FOLLOWERS,payload:followers}
}

module.exports = {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  SET_USER_LOGOUT,
  FETCH_ALL_USERS,
  FETCH_USER_FOLLOWERS
};
