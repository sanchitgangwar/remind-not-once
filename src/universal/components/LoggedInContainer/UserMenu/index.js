import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import {
    showSnackbarAction,
    hideSnackbarAction
} from 'Universal/actions/snackbar';
import api from 'Universal/utils/api';

import styles from './index.css';

class UserMenu extends Component {
    static propTypes = {
        userDetails: PropTypes.object.isRequired,
        showSnackbar: PropTypes.func.isRequired,
        hideSnackbar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false
        };
    }

    handleAvatarClick = (event) => {
        this.setState({
            open: true,
            anchorEl: event.target
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    handleLogout = () => {
        api.get({
            path: '/api/auth/logout'
        }).then(() => {
            if (window) {
                window.location.href = '/';
            }
        }, () => {
            this.props.showSnackbar({
                message: 'Please try again.',
                onRequestClose: this.props.hideSnackbar
            });
            this.setState({
                open: false
            });
        });
    };

    render() {
        return (
            <IconButton>
                <Avatar src={this.props.userDetails.image.url}
                    onClick={this.handleAvatarClick} />

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <div className={styles.details}>
                        <div className={styles.text}>
                            <Typography type="body1">{ this.props.userDetails.displayName }</Typography>
                            <Typography type="caption">sanchitgangwar@gmail.com</Typography>
                        </div>
                        <div className={styles.image}>
                            <Avatar src={this.props.userDetails.image.url} />
                        </div>
                    </div>

                    <MenuItem onClick={this.handleLogout} selected>
                            Logout
                    </MenuItem>
                </Menu>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.user.details
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSnackbar: showSnackbarAction,
        hideSnackbar: hideSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
