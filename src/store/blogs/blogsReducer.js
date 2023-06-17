const BLOGS_ACTION_TYPES = require("./blogs.actionTypes");

const INITIAL_STATE = {
  blogs: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
};

const blogsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BLOGS_ACTION_TYPES.SET_BLOGS_START:
      return {
        ...state,
        isLoading: true,
        error:false,
      };
    case BLOGS_ACTION_TYPES.SET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload,
        isLoading: false,
      };
    case BLOGS_ACTION_TYPES.SET_BLOGS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case BLOGS_ACTION_TYPES.SET_ISMODALOPEN:
      return {
        ...state,
        isModalOpen: payload,
      };
    default:
      return state;
  }
};

module.exports = blogsReducer;
