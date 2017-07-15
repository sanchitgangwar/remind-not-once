import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Button, Typography } from 'material-ui';

import api from 'Universal/utils/api';
import { showSnackbarAction, hideSnackbarAction } from 'Universal/actions/snackbar';

import Logo from '../../../../assets/images/LogoFull.svg';
import GoogleLogo from '../../../../assets/images/google_logo1600.png';

import styles from './index.css';

class Login extends Component {
    static propTypes = {
        showSnackbar: PropTypes.func.isRequired,
        hideSnackbar: PropTypes.func.isRequired
    };

    handleLogin = () => {
        api.post({
            path: '/api/auth/login'
        }).then((response) => {
            window.location.href = response.url;
        }, () => {
            this.props.showSnackbar({
                message: 'Please try again',
                onRequestClose: this.handleSnackbarClose
            });
        });
    };

    handleSnackbarClose = () => {
        this.props.hideSnackbar();
    };

    render() {
        return (
            <div className={styles.container}>
                <Paper className={styles.paper} elevation={4}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={Logo} />
                    </div>

                    <div className={styles.textContainer}>
                        <Typography align="center">
                            Login using your Google account to give (R)+
                            permission to make changes to your Google Calendar.
                        </Typography>
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button raised color="primary"
                            style={{
                                backgroundColor: '#4285f4',
                                padding: '0 20px 0 0'
                            }}
                            onClick={this.handleLogin}>
                            <span className={styles.googleLogoContainer}>
                                <img
                                    className={styles.googleLogo}
                                    src={GoogleLogo}
                                />
                            </span>
                            Login using Google
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSnackbar: showSnackbarAction,
        hideSnackbar: hideSnackbarAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
