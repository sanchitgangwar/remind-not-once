import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import CalendarSelect from './CalendarSelect';
import StatusSelect from './StatusSelect';
import Contact from './Contact';

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
                <CalendarSelect />

                <Divider />

                <StatusSelect />

                <Divider />

                <Contact />

            </Drawer>
        );
    }
}

export default DrawerComponent;
