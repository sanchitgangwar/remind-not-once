import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import {
    closeDrawerAction
} from 'Universal/actions/drawer';

import CalendarSelect from './CalendarSelect';
import StatusSelect from './StatusSelect';
import Source from './Source';
import LogoFull from '../../../../../assets/images/LogoFull_228.png';

import styles from './index.css';

const classes = {
    drawer: {
        paper: styles.root
    }
};

class DrawerComponent extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        docked: PropTypes.bool.isRequired,
        closeDrawer: PropTypes.func.isRequired
    };

    render() {
        return (
            <Drawer
                open={this.props.open}
                docked={this.props.docked}
                classes={classes.drawer}
                onRequestClose={this.props.closeDrawer}
            >
                <div className={styles.logoContainer}>
                    <img src={LogoFull} className={styles.logo} />
                </div>

                <CalendarSelect />

                <Divider />

                <StatusSelect />

                <Divider />

                <Source />
            </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return {
        open: state.drawer.open,
        docked: state.drawer.docked
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeDrawer: closeDrawerAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
