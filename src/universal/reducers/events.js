import {
    SET_EVENTS_FOR_DATE,
    DELETE_EVENT
} from 'Universal/actions/calendars';

export default function (state = {
    dates: {}
}, action) {
    switch (action.type) {
    case SET_EVENTS_FOR_DATE:
        return {
            ...state,
            dates: action.payload
        };
    case DELETE_EVENT:
        return {
            ...state
        };
    default:
        return state;
    }
}
