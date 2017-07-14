import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import styles from './index.css';

class UserMenu extends Component {
    static propTypes = {
        userDetails: PropTypes.object.isRequired
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
                    <MenuItem className={styles.details} disabled>
                        <div className={styles.text}>
                            <Typography type="body1">{ this.props.userDetails.displayName }</Typography>
                            <Typography type="caption">sanchitgangwar@gmail.com</Typography>
                        </div>
                        <div className={styles.image}>
                            <Avatar src={this.props.userDetails.image.url} />
                        </div>
                    </MenuItem>
                    <MenuItem selected onClick={this.handleRequestClose}>Logout</MenuItem>
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

export default connect(mapStateToProps, null)(UserMenu);
