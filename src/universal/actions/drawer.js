export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';
export const DRAWER_CLOSE_IF_NOT_DOCKED = 'DRAWER_CLOSE_IF_NOT_DOCKED';

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

function closeDrawerIfNotDockedAction() {
    return {
        type: DRAWER_CLOSE_IF_NOT_DOCKED
    }
}

export {
    openDrawerAction,
    closeDrawerAction,
    toggleDrawerAction,
    closeDrawerIfNotDockedAction
};
