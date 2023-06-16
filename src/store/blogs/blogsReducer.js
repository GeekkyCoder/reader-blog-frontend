const BLOGS_ACTION_TYPES = require("./blogs.actionTypes");

const INITIAL_STATE = {
  blogs: [],
  isLoading: false,
  error: null,
};

const blogsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BLOGS_ACTION_TYPES.SET_BLOGS_START:
      return {
        ...state,
        isLoading: true,
      };
    case BLOGS_ACTION_TYPES.SET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload,
        isLoading:false,
      };
    case BLOGS_ACTION_TYPES.SET_BLOGS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
  }
};

module.exports =  blogsReducer;