import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import Root from 'Universal/components/AppContainer';
import store from './store';

const renderDOM = (Component) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Route component={Component} />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderDOM(Root);

if (module.hot) {
    module.hot.accept('Universal/components/AppContainer', () => {
        const NextApp = require('Universal/components/AppContainer').default;
        renderDOM(NextApp);
    });
}
