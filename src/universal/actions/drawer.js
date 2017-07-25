export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';

function openDrawerAction() {
    return {
        type: DRAWER_OPEN
    };
}

function closeDrawerAction() {
    return {
        type: DRAWER_CLOSE
    };
}

function toggleDrawerAction() {
    return {
        type: DRAWER_TOGGLE
    };
}

export {
    openDrawerAction,
    closeDrawerAction,
    toggleDrawerAction
};
