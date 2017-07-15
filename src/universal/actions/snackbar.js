export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

function showSnackbarAction(payload) {
    return {
        type: SHOW_SNACKBAR,
        payload
    };
}

function hideSnackbarAction() {
    return {
        type: HIDE_SNACKBAR
    };
}

export {
    showSnackbarAction,
    hideSnackbarAction
};
