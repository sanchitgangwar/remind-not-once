import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const intialState = {};

const store = createStore(
    () => null,
    intialState,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
