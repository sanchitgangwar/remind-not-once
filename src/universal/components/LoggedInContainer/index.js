import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import EventsList from 'Universal/pages/EventsList';
import UserMenu from './UserMenu';

import LogoFull from '../../../../assets/images/LogoFull.svg';
import styles from './index.css';

class LoggedInContainer extends Component {
    static propTypes = {
        userDetails: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className={styles.root}>
                <AppBar style={{
                    backgroundColor: '#eee',
                    height: 65
                }}>
                    <Toolbar>
                        <Link to="/" className={styles.logoContainer}>
                            <img src={LogoFull} className={styles.logo} />
                        </Link>
                        <UserMenu />
                    </Toolbar>
                </AppBar>

                <div className={styles.contentContainer}>
                    <Route exact path="/" component={EventsList} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.user.details
    };
}

export default connect(mapStateToProps, null)(LoggedInContainer);
