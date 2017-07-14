import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProtectedRoute from 'Universal/components/ProtectedRoute';
import Login from 'Universal/pages/Login';
import NotFound from 'Universal/pages/NotFound';
import Loader from 'Universal/components/Loader';
import LoggedInContainer from 'Universal/components/LoggedInContainer';

import { initLoginAction } from 'Universal/actions/user';

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
        isCookieChecked: PropTypes.bool.isRequired,
        initLogin: PropTypes.func.isRequired
    };

    componentDidMount() {
        // Try logging in by checking and verifying the cookies.
        if (!this.props.isLoggedIn && !this.props.isCookieChecked) {
            this.props.initLogin();
        }
    }

    render() {
        if (this.props.isLoggingIn) {
            return (
                <Loader />
            );
        }

        return (
            <Switch>
                <ProtectedRoute exact path="/" render={() => (
                    <LoggedInContainer />
                )} />
                <Route exact path="/login" render={() => (
                    this.props.isLoggedIn ?
                        <Redirect to="/" /> :
                        <Login />
                )} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.user.isLoggingIn,
        isLoggedIn: state.user.isLoggedIn,
        isCookieChecked: state.user.isCookieChecked
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initLogin: initLoginAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
