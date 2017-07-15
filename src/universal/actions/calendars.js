export const SET_CALENDARS_LIST = 'SET_CALENDARS_LIST';
export const SET_SELECTED_CALENDAR = 'SET_SELECTED_CALENDAR';
export const SET_DEFAULT_CALENDAR = 'SET_DEFAULT_CALENDAR';

function setCalendarsListAction(payload) {
    return {
        type: SET_CALENDARS_LIST,
        payload
    };
}

function setSelectedCalendarAction(payload) {
    return {
        type: SET_SELECTED_CALENDAR,
        payload
    };
}

export {
    setCalendarsListAction,
    setSelectedCalendarAction
};
