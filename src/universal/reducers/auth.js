import {
    LOGIN,
    LOGOUT
} from 'actions/login';

export default function auth(state = {
    loggedIn: false,
    showLogin: false,
    showLocationSelector: false
}, action) {
    switch (action.type) {
    case LOGIN:
        return {
            ...state,
            signup: false,
            showLogin: true
        };
    case HIDE_LOGIN_MODAL:
        return {
            ...state,
            signup: false,
            showLogin: false
        };
    case SHOW_LOCATION_SELECTOR:
        return {
            ...state,
            showLocationSelector: true
        };
    case HIDE_LOCATION_SELECTOR:
        return {
            ...state,
            showLocationSelector: false
        };
    default:
        return state;
    }
}
