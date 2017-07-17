import {
    SHOW_SNACKBAR,
    HIDE_SNACKBAR
} from 'Universal/actions/snackbar';

export default function (state = {
    open: false,
    message: undefined
}, action) {
    switch (action.type) {
    case SHOW_SNACKBAR:
        return {
            ...state,
            open: true,
            ...action.payload
        };
    case HIDE_SNACKBAR:
        return {
            ...state,
            open: false
        };
    default:
        return state;
    }
}
