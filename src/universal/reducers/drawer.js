import {
    DRAWER_OPEN,
    DRAWER_CLOSE,
    DRAWER_TOGGLE
} from 'Universal/actions/drawer';

export default function (state = {
    open: false
}, action) {
    switch (action.type) {
    case DRAWER_OPEN:
        return {
            open: true
        };
    case DRAWER_CLOSE:
        return {
            open: false
        };
    case DRAWER_TOGGLE:
        return {
            open: !state.open
        };
    default:
        return state;
    }
}
