const BLOG_ACTION_TYPES = require("./blogs.actionTypes");

const FETCH_BLOGS_START = () => {
  return { type: BLOG_ACTION_TYPES.SET_BLOGS_START };
};

const FETCH_BLOGS_SUCCESS = (blogs) => {
  return { type: BLOG_ACTION_TYPES.SET_BLOGS_SUCCESS, payload: blogs };
};

const FETCH_BLOGS_FAILED = (err) => {
  return { type: BLOG_ACTION_TYPES.SET_BLOGS_FAILED, payload: err };
};

const TOGGLE_ISMODALOPEN = (state) => {
  return { type: BLOG_ACTION_TYPES.SET_ISMODALOPEN, payload: state };
};


module.exports = {
  FETCH_BLOGS_START,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILED,
  TOGGLE_ISMODALOPEN
};
