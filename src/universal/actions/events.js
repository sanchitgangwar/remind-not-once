export const SET_EVENTS_FOR_DATE = 'SET_EVENTS_FOR_DATE';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

function setEventsForDateAction(payload) {
    return {
        type: SET_EVENTS_FOR_DATE,
        payload
    };
}

export {
    setEventsForDateAction
};
