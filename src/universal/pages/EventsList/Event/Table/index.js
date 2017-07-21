import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
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

    constructor(props) {
        super(props);

        this.state = {
            processing: {}
        };
    }

    handleActionClick = (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        const { processing } = this.state;

        this.setState({
            processing: {
                ...processing,
                [index]: true
            }
        });

        this.props.onActionClick(event, index).then(() => {
            this.setState({
                processing: {
                    ...processing,
                    [index]: false
                }
            });
        }, () => this.setState({
            processing: {
                ...processing,
                [index]: false
            }
        }));
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
                                classes={{
                                    root: styles.listItem
                                }}>

                                <ListItemText primary={value} />
                                <ListItemSecondaryAction>
                                    <div className={styles.buttonWrapper}>
                                        <IconButton
                                            aria-label="Done"
                                            data-index={index}
                                            onClick={this.handleActionClick}
                                            disabled={this.state.processing[index]}>
                                            { this.props.actionIcon }
                                        </IconButton>

                                        {
                                            this.state.processing[index] &&
                                                <CircularProgress
                                                    size={50}
                                                    className={styles.progress}
                                                />
                                        }
                                    </div>
                                </ListItemSecondaryAction>
                            </ListItem>)
                    }
                </List>
            </div>
        );
    }
}

export default Table;
