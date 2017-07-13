import api from 'Universal/utils/api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

function login() {
    return () => {
        api.post({
            path: '/api/auth/login'
        }).catch(() => {
            console.err('Something went wrong');
        });
    };
}

function logout() {
    return {
        type: LOGOUT
    };
}

export {
    login,
    logout
};
