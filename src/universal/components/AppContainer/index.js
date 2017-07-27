import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

import ProtectedRoute from 'Universal/components/ProtectedRoute';
import Login from 'Universal/pages/Login';
import NotFound from 'Universal/pages/NotFound';
import Loader from 'Universal/components/Loader';
import LoggedInContainer from 'Universal/components/LoggedInContainer';

import { hideSnackbarAction } from 'Universal/actions/snackbar';
import { initLoginAction } from 'Universal/actions/user';

import styles from './index.css';

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
        isCookieChecked: PropTypes.bool.isRequired,
        initLogin: PropTypes.func.isRequired,
        snackbar: PropTypes.object.isRequired,
        hideSnackbar: PropTypes.func.isRequired
    };

    componentDidMount() {
        // Try logging in by checking and verifying the cookies.
        if (!this.props.isLoggedIn && !this.props.isCookieChecked) {
            this.props.initLogin();
        }

        // Register Service Worker
        if ('serviceWorker' in navigator &&
            (window.location.protocol === 'https:'
                || window.location.hostname === 'localhost')) {
            const registration = runtime.register();

            registerEvents(registration, {
                onInstalled: () => {
                    console.log('onInstalled');
                },
                onUpdateReady: () => {
                    console.log('onUpdateReady');
                },
                onUpdating: () => {
                    console.log('onUpdating');
                },
                onUpdateFailed: () => {
                    console.log('onUpdateFailed');
                },
                onUpdated: () => {
                    console.log('onUpdated');
                }
            });
        }
    }

    render() {
        if (this.props.isLoggingIn) {
            return (
                <Loader />
            );
        }

        return (
            <div className={styles.root}>
                <Switch>
                    <Route exact path="/login" render={() => (
                        this.props.isLoggedIn ?
                            <Redirect to="/" /> :
                            <Login />
                    )} />
                    <ProtectedRoute exact path="/" render={props => (
                        <LoggedInContainer {...props} />
                    )} />
                    <ProtectedRoute exact path="/create" render={props => (
                        <LoggedInContainer {...props} />
                    )} />
                    <Route component={NotFound} />
                </Switch>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.props.snackbar.open}
                    onRequestClose={this.props.hideSnackbar}
                    transition={<Slide direction="up" />}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={this.props.snackbar.autoHideDuration || 2000}
                    message={<span id="message-id">{this.props.snackbar.message}</span>}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        snackbar: state.snackbar,
        isLoggingIn: state.user.isLoggingIn,
        isLoggedIn: state.user.isLoggedIn,
        isCookieChecked: state.user.isCookieChecked
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initLogin: initLoginAction,
        hideSnackbar: hideSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
