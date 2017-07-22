import readCookie from 'Universal/utils/cookie';
import api from 'Universal/utils/api';

export const LOG_IN_INIT = 'LOG_IN_INIT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const USER_LOGGED_OUT = 'LOGOUT';

function initLoginAction() {
    const token = readCookie('T');

    if (token) {
        return (dispatch) => {
            dispatch({
                type: LOG_IN_INIT
            });

            api.get({
                path: '/api/user'
            }).then((response) => {
                dispatch({
                    type: SET_USER_DETAILS,
                    payload: response
                });
            }, () => {
                dispatch({
                    type: LOG_IN_FAILED
                });
            });
        };
    }

    return {
        type: LOG_IN_FAILED
    };
}

export {
    initLoginAction
};
