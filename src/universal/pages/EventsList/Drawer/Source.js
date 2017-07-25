import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import CodeIcon from 'material-ui-icons/Code';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';

import styles from './index.css';

const classes = {
    icon: {
        root: styles.icon
    }
};

class Contact extends Component {
    render() {
        return (
            <div>
                <List>
                    <a
                        href="https://github.com/sanchitgangwar/remind-plus"
                        className={styles.noDecoration}
                        target="_blank"
                    >
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="contact-dialog"
                            aria-label="Contact"
                        >
                            <ListItemIcon>
                                <CodeIcon classes={classes.icon} />
                            </ListItemIcon>

                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography
                                        className={styles.listItemText}
                                    >
                                        Source
                                    </Typography>
                                }
                            />

                            <ListItemIcon>
                                <OpenInNewIcon classes={classes.icon} />
                            </ListItemIcon>
                        </ListItem>
                    </a>
                </List>
            </div>
        );
    }
}

export default Contact;
