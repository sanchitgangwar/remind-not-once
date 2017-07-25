import {
    DRAWER_OPEN,
    DRAWER_CLOSE,
    DRAWER_TOGGLE,
    DRAWER_CLOSE_IF_NOT_DOCKED
} from 'Universal/actions/drawer';

export default function (state = {
    open: false,
    docked: false
}, action) {
    switch (action.type) {
    case DRAWER_OPEN:
        return {
            ...state,
            open: true,
            ...action.payload
        };
    case DRAWER_CLOSE:
        return {
            ...state,
            open: false,
            ...action.payload
        };
    case DRAWER_TOGGLE:
        return {
            ...state,
            open: !state.open,
            ...action.payload
        };
    case DRAWER_CLOSE_IF_NOT_DOCKED:
        return {
            ...state,
            open: state.docked ? state.open : false
        };
    default:
        return state;
    }
}
