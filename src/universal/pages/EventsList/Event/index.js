import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import lightGreen from 'material-ui/colors/lightGreen';
import pink from 'material-ui/colors/pink';

import DoneIcon from 'material-ui-icons/Done';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import UndoIcon from 'material-ui-icons/Undo';

import api from 'Universal/utils/api';
import dateUtil from 'Universal/utils/date';
import { updateEventAction } from 'Universal/actions/events';
import { showSnackbarAction } from 'Universal/actions/snackbar';

import StatusBar from './StatusBar';
import Table from './Table';

import styles from './index.css';

class Event extends Component {
    static propTypes = {
        calendarId: PropTypes.string.isRequired,
        details: PropTypes.object.isRequired,
        showSnackbar: PropTypes.func.isRequired,
        updateEvent: PropTypes.func.isRequired,
        date: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            showCompleted: false,
            selected: []
        };
    }

    handleToggle = (event, index) => {
        const i = this.state.selected.indexOf(index);
        if (i !== -1) {
            this.setState({
                selected: [
                    ...this.state.selected.slice(0, i),
                    ...this.state.selected.slice(i + 1, -1)
                ]
            });
        } else {
            this.setState({
                selected: [
                    ...this.state.selected,
                    index
                ]
            });
        }
    };

    handleExpandClick = () => {
        this.setState({
            showCompleted: !this.state.showCompleted
        });
    };

    handleDoneAll = () => {
        const { calendarId, details: { id } } = this.props;

        return api.put({
            path: `/api/calendars/${calendarId}/events/${id}`,
            query: {
                op: 'DONE'
            }
        }).then((newTasks) => {
            this.props.updateEvent({
                id,
                date: this.props.date,
                completed: newTasks.completed,
                incomplete: newTasks.incomplete
            });
            this.props.showSnackbar({
                message: 'Marked all as completed.'
            });
        }, () => {
            this.props.showSnackbar({
                message: 'Could not mark as completed.'
            });
        });
    };

    handleUndo = (event, index) => {
        const { calendarId, details: { id } } = this.props;

        return api.put({
            path: `/api/calendars/${calendarId}/events/${id}/tasks`,
            query: {
                op: 'UNDO'
            }
        }, {
            task: this.props.details.completed[index]
        }).then((newTasks) => {
            this.props.updateEvent({
                id,
                date: this.props.date,
                completed: newTasks.completed,
                incomplete: newTasks.incomplete
            });
            this.props.showSnackbar({
                message: 'Marked as incomplete.'
            });
        }, () => {
            this.props.showSnackbar({
                message: 'Could not mark as incomplete.'
            });
        });
    };

    handleDone = (event, index) => {
        const { calendarId, details: { id } } = this.props;

        return api.put({
            path: `/api/calendars/${calendarId}/events/${id}/tasks`,
            query: {
                op: 'DONE'
            }
        }, {
            task: this.props.details.incomplete[index]
        }).then((newTasks) => {
            this.props.updateEvent({
                id,
                date: this.props.date,
                completed: newTasks.completed,
                incomplete: newTasks.incomplete
            });
            this.props.showSnackbar({
                message: 'Marked as completed.'
            });
        }, () => {
            this.props.showSnackbar({
                message: 'Could not mark as completed.'
            });
        });
    };

    render() {
        const {
            details: {
                created,
                completed,
                incomplete,
                startDate,
                endDate,
                summary
            }
        } = this.props;

        const nCompleted = completed.length;
        const nIncomplete = incomplete.length;

        return (
            <Card className={styles.card}>
                <StatusBar nCompleted={nCompleted} nIncomplete={nIncomplete} />

                <CardContent>
                    <div className={styles.headerContainer}>
                        <div className={styles.headerText}>
                            <Typography type="headline" component="h4">
                                { summary }
                            </Typography>
                            <Typography type="caption">
                                { dateUtil.displayStartEndDates(startDate, endDate) },

                                &nbsp;&nbsp;

                                Created: { created }
                            </Typography>
                        </div>

                        <div className={styles.headerIcons}>
                            {
                                nIncomplete ? (
                                    <IconButton
                                        aria-label="Done All"
                                        onClick={this.handleDoneAll}>
                                        <DoneAllIcon />
                                    </IconButton>
                                ) : null
                            }
                        </div>
                    </div>

                    <Typography style={{ margin: '10px 0 20px 0' }}>
                        Total: {nIncomplete + nCompleted}, Remaining: {incomplete.length}
                    </Typography>

                    {
                        nIncomplete ? (
                            <Table
                                title="INCOMPLETE"
                                backgroundColor={pink['50']}
                                list={incomplete}
                                actionIcon={<DoneIcon />}
                                onActionClick={this.handleDone}
                            />
                        ) : (
                            <Typography type="subheading" align="center">
                                All tasks completed.
                            </Typography>
                        )
                    }
                </CardContent>

                <Collapse in={Boolean(nCompleted) && this.state.showCompleted}
                    transitionDuration="auto" unmountOnExit>

                    <CardContent>
                        <Table
                            title="COMPLETED"
                            backgroundColor={lightGreen['50']}
                            list={completed}
                            actionIcon={<UndoIcon />}
                            onActionClick={this.handleUndo}
                        />
                    </CardContent>
                </Collapse>
                {
                    nCompleted ? (
                        <CardActions classes={{
                            root: styles.cardActionContainer
                        }}>
                            <Button dense color="primary" onClick={this.handleExpandClick}>
                                { this.state.showCompleted ?
                                    'Hide completed' :
                                    'Show completed' }
                            </Button>
                        </CardActions>
                    ) : null
                }
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateEvent: updateEventAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Event);
