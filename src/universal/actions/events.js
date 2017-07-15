export const SET_EVENTS_FOR_DATE = 'SET_EVENTS_FOR_DATE';
export const DELETE_EVENT = 'DELETE_EVENT';

function setEventsForDateAction(payload) {
    return {
        type: SET_EVENTS_FOR_DATE,
        payload
    };
}

function deleteEventAction(payload) {
    return {
        type: DELETE_EVENT,
        payload
    };
}

export {
    setEventsForDateAction,
    deleteEventAction
};
