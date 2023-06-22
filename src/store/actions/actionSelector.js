export const actionSelector = (state) => state.actions;
export const loadingActionSelector = (state) => state.actions.isLoading;
export const errorActionSelector = (state) => state.actions.error;
export const snackbarMessageActionSelector = (state) => state.actions.snackBarMessage;
export const isSnackBarOpenActionSelector = (state) => state.actions.isSnackBarOpen;
