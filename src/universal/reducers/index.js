import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import snackbar from './snackbar';
import calendars from './calendars';
import events from './events';
import filters from './filters';
import drawer from './drawer';

const rootReducer = combineReducers({
    form: formReducer,
    user,
    snackbar,
    calendars,
    events,
    filters,
    drawer
});

export default rootReducer;
