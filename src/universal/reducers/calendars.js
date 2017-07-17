import {
    SET_CALENDARS_LIST,
    SET_SELECTED_CALENDAR
} from 'Universal/actions/calendars';

export default function (state = {
    selected: {},
    list: []
}, action) {
    switch (action.type) {
    case SET_CALENDARS_LIST:
        return {
            ...state,
            list: action.payload
        };
    case SET_SELECTED_CALENDAR:
        return {
            ...state,
            selected: action.payload
        };
    default:
        return state;
    }
}
