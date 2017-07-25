import { CLEAR_EVENTS } from './events';

export const SET_SELECTED_CALENDAR = 'SET_SELECTED_CALENDAR';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_STATUS_FILTER = 'SET_STATUS_FILTER';

function setSelectedCalendarAction(payload) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_EVENTS
        });

        dispatch({
            type: SET_SELECTED_CALENDAR,
            payload
        });
    };
}

function setSelectedDateAction(payload) {
    return {
        type: SET_SELECTED_DATE,
        payload
    };
}

function setStatusFilterAction(payload) {
    return {
        type: SET_STATUS_FILTER,
        payload
    };
}

export {
    setSelectedCalendarAction,
    setSelectedDateAction,
    setStatusFilterAction
};
