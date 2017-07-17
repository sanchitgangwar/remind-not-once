import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Bookmark from 'material-ui-icons/Bookmark';

import {
    setSelectedCalendarAction,
    setCalendarsListAction
} from 'Universal/actions/calendars';
import {
    setEventsForDateAction
} from 'Universal/actions/events';
import {
    showSnackbarAction
} from 'Universal/actions/snackbar';
import api from 'Universal/utils/api';

import styles from './index.css';

class CalendarSelect extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setSelectedCalendar: PropTypes.func.isRequired,
        setCalendarsList: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired,
        showSnackbar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false
        };
    }

    componentDidMount() {
        if (!this.props.calendars.list.length) {
            api.get({
                path: '/api/calendars/list'
            }).then((response) => {
                this.props.setSelectedCalendar(response[0]);
                this.props.setCalendarsList(response);
            }, () => {
                this.props.showSnackbar({
                    message: 'Could not fetch calendars.'
                });
            });
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    handleClickListItem = (event) => {
        this.setState({
            open: true,
            anchorEl: event.target
        });
    };

    handleCalendarSelect = (index) => {
        this.props.setSelectedCalendar(this.props.calendars.list[index]);
        this.setState({
            open: false
        });
    };

    render() {
        const selected = this.props.calendars.selected || {};

        return (
            <div className={styles.root}>
                <List className={styles.button}>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="calendar-menu"
                        aria-label="Calendar"
                        onClick={this.handleClickListItem}
                        disabled={!selected.id}
                    >
                        <ListItemText
                            primary={
                                <span className={cx({
                                    [styles.placeholder]: !selected.id
                                })}>
                                    Calendar
                                </span>
                            }
                            secondary={
                                <span className={cx({
                                    [styles.placeholder]: !selected.id
                                })}>
                                    {selected.summary || 'NONE'}
                                </span>
                            }
                        />
                        <ListItemIcon>
                            <Bookmark style={{
                                fill: selected.backgroundColor || 'currentColor'
                            }} />
                        </ListItemIcon>
                    </ListItem>
                </List>
                <Menu
                    id="calendar-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {
                        this.props.calendars.list.map((calendar, index) => (
                            <MenuItem
                                key={index}
                                selected={selected.id === calendar.id}
                                onClick={this.handleCalendarSelect.bind(this, index)}
                            >
                                <div className={styles.menuItem}>
                                    {calendar.summary}
                                    <Bookmark style={{
                                        fill: calendar.backgroundColor,
                                        marginLeft: 10
                                    }} />
                                </div>
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        calendars: state.calendars,
        events: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedCalendar: setSelectedCalendarAction,
        setCalendarsList: setCalendarsListAction,
        setEventsForDate: setEventsForDateAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSelect);
