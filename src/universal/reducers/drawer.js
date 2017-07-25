import {
    DRAWER_OPEN,
    DRAWER_CLOSE,
    DRAWER_TOGGLE
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
    default:
        return state;
    }
}
