export const userSelectorReducer = (state) => state.user;

export const userErrorSelector = state => state.user.error

export const userLoadingSelector = state => state.user.isLoading