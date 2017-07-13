import React, { Component } from 'react';
import { Paper, Button, Typography, Snackbar } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';

import api from 'Universal/utils/api';

import Logo from '../../../../assets/images/logo.svg';
import GoogleLogo from '../../../../assets/images/google_logo1600.png';

import styles from './index.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        };
    }

    handleLogin = () => {
        api.post({
            path: '/api/auth/login'
        }).then((response) => {
            window.location.href = response.url;
        }, () => {
            this.setState({
                error: true
            });
        });
    };

    handleSnackbarClose = () => {
        this.setState({
            error: false
        });
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

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.error}
                    onRequestClose={this.handleSnackbarClose}
                    transition={<Slide direction="up" />}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={1000}
                    message={<span id="message-id">Please try again.</span>}
                />
            </div>
        );
    }
}

export default Login;
