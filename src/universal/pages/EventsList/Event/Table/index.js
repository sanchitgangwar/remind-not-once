import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import styles from './index.css';

class Table extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        list: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string,
        actionIcon: PropTypes.element,
        onActionClick: PropTypes.func
    };

    render() {
        return (
            <div className={styles.listRoot}
                style={{
                    backgroundColor: this.props.backgroundColor || '#fcfcfc'
                }}>
                <Typography type="subheading">
                    { this.props.title }
                </Typography>
                <List>
                    {
                        this.props.list.map((value, index) =>
                            <ListItem dense button key={value}
                                onClick={event => this.handleToggle(event, index)}
                                classes={{
                                    root: styles.listItem
                                }}>

                                <ListItemText primary={value} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Done">
                                        { this.props.actionIcon }
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>)
                    }
                </List>
            </div>
        );
    }
}

export default Table;
