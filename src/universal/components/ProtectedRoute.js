import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Redirect,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {
            isLoggedIn,
            ...rest
        } = this.props;

        if (!isLoggedIn) {
            return (
                <Redirect to={{
                    pathname: '/login',
                }} />
            );
        }

        return (
            <Route {...rest} />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
}

export default connect(mapStateToProps, null)(ProtectedRoute);
