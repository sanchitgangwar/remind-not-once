import {
    SET_CALENDARS_LIST
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
    default:
        return state;
    }
}
