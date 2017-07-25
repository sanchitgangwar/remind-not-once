export const SET_CALENDARS_LIST = 'SET_CALENDARS_LIST';

function setCalendarsListAction(payload) {
    return {
        type: SET_CALENDARS_LIST,
        payload
    };
}

export {
    setCalendarsListAction
};
