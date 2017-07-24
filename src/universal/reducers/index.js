import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import snackbar from './snackbar';
import calendars from './calendars';
import events from './events';
import date from './date';

const rootReducer = combineReducers({
    form: formReducer,
    user,
    snackbar,
    calendars,
    events,
    date
});

export default rootReducer;
