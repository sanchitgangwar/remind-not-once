import express from 'express';
import exphbs from 'express-handlebars';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import path from 'path';
import fetch from 'node-fetch';
import 'promise.prototype.finally';

import compress from 'compression';
// import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import bunyan from 'bunyan';
import logger from 'express-bunyan-logger';

import apiEndpoints from './api';
import authMiddleware from './authMiddleware';

// import routes from '../client/routes';
// import rootReducer from '../client/reducers';
// import initializeStore from '../client/stores/initializeStore';

const log = bunyan.createLogger({
    name: 'app'
});

global.fetch = fetch;

const app = express();

// Change Default template engine to handlebars for res.render
app.use(express.static('dist/'));
// app.engine('.hbs', exphbs({
//     extname: '.hbs'
// }));
// app.set('views', path.join('../../dist'));
// app.set('view engine', '.hbs');

app.use(logger({
    name: 'app'
}));

app.disable('x-powered-by');
app.use(compress());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, must-revalidate');
    res.header('Control-Security-Policy', 'default-src  "self";');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('Strict-Transport-Security', 'max-age=31536000;preload');
    res.header('X-Content-Type-Options', 'nosniff');
    next();
});

app.use('/api', authMiddleware);
app.use('/api', apiEndpoints);

app.use('*', express.static('dist/'));

// The handler for page requests
// app.use((req, res) => {
//     const store = createStore(
//         rootReducer,
//         applyMiddleware(thunkMiddleware)
//     );

//     res.header('X-Frame-Options', 'SAMEORIGIN');
//     try {
//         match(
//             { routes, location: req.url },
//             (error, redirectLocation, renderProps) => {
//                 if (error) {
//                     res.send(500);
//                 } else if (redirectLocation) {
//                     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//                 } else if (renderProps) {
//                     store.dispatch(initializeStore(req)).then(() => {
//                         const InitialView = (
//                             <Provider store={store}>
//                                 <RouterContext {...renderProps} />
//                             </Provider>
//                         );

//                         const componentHTML = renderToString(InitialView);
//                         const initialState = store.getState();

//                         return {
//                             html: componentHTML,
//                             initialState: initialState && JSON.stringify(initialState) || '{}',
//                             title: 'Gamoly'
//                         };
//                     })
//                     .then((data) => res.status(200).render('index.hbs', data))
//                     .catch((err) => {
//                         req.log.error('Error: ', err);
//                     });
//                 }
//             }
//         );
//     } catch (exception) {
//         req.log.error('exception: ', exception);
//     }
// });

const PORT = process.env.PORT || 12000;

app.listen(PORT, () => {
    log.info(`Server listening on port ${PORT}`);
});
