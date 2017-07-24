import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import CalendarSelect from './CalendarSelect';

import styles from './index.css';

const classes = {
    drawer: {
        paper: styles.root
    }
};

class DrawerComponent extends Component {
    render() {
        return (
            <Drawer open={true} docked classes={classes.drawer}>
                <List>
                    <CalendarSelect />
                    <Divider />
                </List>
            </Drawer>
        );
    }
}

export default DrawerComponent;
