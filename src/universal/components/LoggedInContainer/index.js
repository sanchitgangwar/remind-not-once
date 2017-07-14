import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

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
                    backgroundColor: '#eee'
                }}>
                    <Toolbar>
                        <Link to="/" className={styles.logoContainer}>
                            <img src={LogoFull} className={styles.logo} />
                        </Link>
                        <UserMenu />
                    </Toolbar>
                </AppBar>
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
