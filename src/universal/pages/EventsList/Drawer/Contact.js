import React, { Component } from 'react';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from 'material-ui/Dialog';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ContactMailIcon from 'material-ui-icons/ContactMail';
import EmailIcon from 'material-ui-icons/Email';

import styles from './index.css';

const classes = {
    icon: {
        root: styles.icon
    },
    dialogContentText: {
        root: styles.flex
    }
};

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleContactClick = () => {
        this.setState({
            open: true
        });
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <div>
                <List>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="contact-dialog"
                        aria-label="Contact"
                        onClick={this.handleContactClick}
                    >
                        <ListItemIcon>
                            <ContactMailIcon classes={classes.icon} />
                        </ListItemIcon>

                        <ListItemText
                            disableTypography
                            primary={
                                <Typography
                                    className={styles.listItemText}
                                >
                                    Contact
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>

                <Dialog
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>Contact</DialogTitle>

                    <DialogContent>
                        <DialogContentText classes={classes.dialogContentText}>
                            <EmailIcon /> &nbsp;&nbsp; remindplus@gmail.com
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleRequestClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Contact;
