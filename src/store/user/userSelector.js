export const currentUserSelector = state => state.user.currentUser

export const userErrorSelector = state => state.user.error

export const userLoadingSelector = state => state.user.isLoading

export const loggedInUserSelector = state => state.user.loggedInUser

export const allUserSelector = state => state.user.users

export const userFollowerSelector = state => state.user.followers