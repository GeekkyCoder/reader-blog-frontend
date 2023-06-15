export const userTokenSelector = (state) => state.user.currentUser.token;

export const currentUserSelector = state => state.user.currentUser.user

export const userErrorSelector = state => state.user.error

export const userLoadingSelector = state => state.user.isLoading

export const loggedInUserSelector = state => state.user.loggedInUser