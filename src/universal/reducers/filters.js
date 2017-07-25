import {
    SET_SELECTED_CALENDAR,
    SET_SELECTED_DATE
} from 'Universal/actions/filters';

export default function (state = {
    calendar: {},
    date: {}
}, action) {
    switch (action.type) {
    case SET_SELECTED_CALENDAR:
        return {
            ...state,
            calendar: action.payload
        };
    case SET_SELECTED_DATE:
        return {
            ...state,
            date: action.payload
        };
    default:
        return state;
    }
}
