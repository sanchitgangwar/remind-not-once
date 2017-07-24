import {
    SET_SELECTED_DATE
} from 'Universal/actions/date';

export default function (state = {
    date: null
}, action) {
    switch (action.type) {
    case SET_SELECTED_DATE:
        return {
            ...action.payload
        };
    default:
        return state;
    }
}
