import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import api from 'Universal/utils/api';
import { showSnackbarAction } from 'Universal/actions/snackbar';

import Logo from '../../../../assets/images/LogoFull_228.png';
import GoogleLogo from '../../../../assets/images/google_logo1600.png';

import styles from './index.css';

class Login extends Component {
    static propTypes = {
        showSnackbar: PropTypes.func.isRequired
    };

    handleLogin = () => {
        api.post({
            path: '/api/auth/login'
        }).then((response) => {
            window.location.href = response.url;
        }, () => {
            this.props.showSnackbar({
                message: 'Login failed. Please try again.'
            });
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
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
