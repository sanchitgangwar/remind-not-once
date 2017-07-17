export const SET_EVENTS_FOR_DATE = 'SET_EVENTS_FOR_DATE';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const UPDATE_EVENT = 'UPDATE_EVENT';

function setEventsForDateAction(payload) {
    return {
        type: SET_EVENTS_FOR_DATE,
        payload
    };
}

function updateEventAction(payload) {
    return {
        type: UPDATE_EVENT,
        payload
    };
}

export {
    setEventsForDateAction,
    updateEventAction
};
