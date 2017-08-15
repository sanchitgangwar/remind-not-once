import {
    LOG_IN_INIT,
    LOG_IN_FAILED,
    LOG_IN_SUCCESS,
    SET_USER_DETAILS,
    USER_LOGGED_OUT
} from 'Universal/actions/user';

import localStorage from 'Universal/utils/localStorage';

const IDENTIFIER = 'accountEmail';

export default function auth(state = {
    isLoggedIn: false,
    isLoggingIn: true,
    isCookieChecked: false,
    details: {
        displayName: 'Sanchit Gangwar',
        image: {
            url: 'https://lh5.googleusercontent.com/-XdvmtghNrGk/AAAAAAAAAAI/AAAAAAAAAYM/J-qlOKLQzf8/photo.jpg?sz=50'
        }
    }
}, action) {
    switch (action.type) {
    case LOG_IN_INIT:
        return {
            ...state,
            isLoggingIn: true
        };
    case LOG_IN_FAILED:
        return {
            ...state,
            isLoggedIn: false,
            isLoggingIn: false,
            isCookieChecked: true
        };
    case LOG_IN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            isLoggingIn: false,
            isCookieChecked: true
        };
    case SET_USER_DETAILS:
        if (localStorage.get(IDENTIFIER) !== action.payload[IDENTIFIER]) {
            localStorage.clear();
            localStorage.set(IDENTIFIER, action.payload[IDENTIFIER]);
        }

        return {
            ...state,
            isLoggedIn: true,
            isLoggingIn: false,
            isCookieChecked: true,
            details: {
                ...action.payload
            }
        };
    case USER_LOGGED_OUT:
        return {
            ...state,
            isLoggedIn: false,
            isLoggingIn: false,
            isCookieChecked: true,
            details: {}
        };
    default:
        return state;
    }
}
