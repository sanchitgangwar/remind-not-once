import {
    SET_SELECTED_CALENDAR,
    SET_SELECTED_DATE,
    SET_STATUS_FILTER
} from 'Universal/actions/filters';

import localStorage from 'Universal/utils/localStorage';

export default function (state = {
    calendar: {},
    date: {},
    status: 'ALL'
}, action) {
    switch (action.type) {
    case SET_SELECTED_CALENDAR:
        localStorage.set('calendar', action.payload);

        return {
            ...state,
            calendar: action.payload
        };
    case SET_SELECTED_DATE:
        return {
            ...state,
            date: action.payload
        };
    case SET_STATUS_FILTER:
        return {
            ...state,
            status: action.payload
        };
    default:
        return state;
    }
}
