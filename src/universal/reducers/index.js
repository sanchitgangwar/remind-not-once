import { combineReducers } from 'redux';

import user from './user';
import snackbar from './snackbar';
import calendars from './calendars';
import events from './events';

const rootReducer = combineReducers({
    user,
    snackbar,
    calendars,
    events
});

export default rootReducer;
