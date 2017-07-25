import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import {
    openDrawerAction,
    closeDrawerAction
} from 'Universal/actions/drawer';
import resizeHandler from 'Universal/utils/resizeHandler';

import CalendarSelect from './CalendarSelect';
import StatusSelect from './StatusSelect';
import LogoFull from '../../../../../assets/images/LogoFull.svg';

import styles from './index.css';

const classes = {
    drawer: {
        paper: styles.root
    }
};

class DrawerComponent extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        openDrawer: PropTypes.func.isRequired,
        closeDrawer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            docked: false
        };
    }

    componentDidMount() {
        this.resizeInstance = resizeHandler.getInstance();
        this.resizeInstance.subscribe(this.handleResize);
        this.handleResize(this.resizeInstance.getDimensions());
    }

    handleResize = (dims) => {
        if (dims.width < 1000) {
            this.props.closeDrawer();
            this.setState({
                docked: false
            });
        } else {
            this.props.openDrawer();
            this.setState({
                docked: true
            });
        }
    };

    render() {
        return (
            <Drawer
                open={this.props.open}
                docked={this.state.docked}
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
            </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return {
        open: state.drawer.open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openDrawer: openDrawerAction,
        closeDrawer: closeDrawerAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
