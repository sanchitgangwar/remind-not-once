export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';

function openDrawerAction(payload) {
    return {
        type: DRAWER_OPEN,
        payload
    };
}

function closeDrawerAction(payload) {
    return {
        type: DRAWER_CLOSE,
        payload
    };
}

function toggleDrawerAction(payload) {
    return {
        type: DRAWER_TOGGLE,
        payload
    };
}

export {
    openDrawerAction,
    closeDrawerAction,
    toggleDrawerAction
};
