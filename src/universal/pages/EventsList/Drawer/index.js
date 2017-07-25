import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import DoneIcon from 'material-ui-icons/Done';
import TimelapseIcon from 'material-ui-icons/Timelapse';

import CalendarSelect from './CalendarSelect';

import styles from './index.css';

const classes = {
    drawer: {
        paper: styles.root
    },
    icon: {
        root: styles.icon
    },
    selected: {
        root: styles.listItemSelected
    }
};

class DrawerComponent extends Component {
    render() {
        return (
            <Drawer open={true} docked classes={classes.drawer}>
                <List>
                    <CalendarSelect />

                    <Divider className={styles.divider} />

                    <ListItem
                        button
                        selected
                        classes={classes.selected}
                    >
                        <ListItemIcon>
                            <ListIcon classes={classes.icon} />
                        </ListItemIcon>

                        <ListItemText
                            disableTypography
                            primary={
                                <Typography>
                                    All
                                </Typography>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <DoneIcon classes={classes.icon} />
                        </ListItemIcon>

                        <ListItemText
                            disableTypography
                            primary={
                                <Typography>
                                    Completed
                                </Typography>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <TimelapseIcon classes={classes.icon} />
                        </ListItemIcon>

                        <ListItemText
                            disableTypography
                            primary={
                                <Typography>
                                    Incomplete
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default DrawerComponent;
