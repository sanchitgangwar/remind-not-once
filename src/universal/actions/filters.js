import { CLEAR_EVENTS } from './events';

export const SET_SELECTED_CALENDAR = 'SET_SELECTED_CALENDAR';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

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

export {
    setSelectedCalendarAction,
    setSelectedDateAction
};
