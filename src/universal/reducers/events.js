import {
    SET_EVENTS_FOR_DATE,
    CLEAR_EVENTS,
    UPDATE_EVENT
} from 'Universal/actions/events';

export default function (state = {
}, action) {
    switch (action.type) {
    case SET_EVENTS_FOR_DATE:
        return {
            ...state,
            [action.payload.date]: action.payload.events
        };
    case CLEAR_EVENTS:
        return {};
    case UPDATE_EVENT:
        for (let events = state[action.payload.date],
            i = events.length - 1;
            i >= 0;
            --i) {
            if (events[i].id === action.payload.id) {
                events[i] = {
                    ...events[i],
                    completed: [
                        ...action.payload.completed
                    ],
                    incomplete: [
                        ...action.payload.incomplete
                    ]
                };

                return {
                    ...state,
                    [action.payload.date]: [
                        ...events
                    ]
                };
            }
        }

        return state;
    default:
        return state;
    }
}
