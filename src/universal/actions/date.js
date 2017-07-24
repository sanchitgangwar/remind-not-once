export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

function setSelectedDateAction(payload) {
    return {
        type: SET_SELECTED_DATE,
        payload
    };
}

export {
    setSelectedDateAction
};
