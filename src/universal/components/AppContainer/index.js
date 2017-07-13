import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from 'Universal/pages/Login';

class Root extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
            </Switch>
        );
    }
}

export default Root;
