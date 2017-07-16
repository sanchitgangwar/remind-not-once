import {
    SET_EVENTS_FOR_DATE,
    CLEAR_EVENTS
} from 'Universal/actions/events';

export default function (state = {
}, action) {
    switch (action.type) {
    case SET_EVENTS_FOR_DATE:
        return {
            ...state,
            [action.payload.date]: action.payload.events
        };
    case CLEAR_EVENTS:
        return {};
    default:
        return state;
    }
}
