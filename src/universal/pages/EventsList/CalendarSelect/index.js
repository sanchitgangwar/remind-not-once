import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import BookmarkIcon from 'material-ui-icons/Bookmark';

import {
    setSelectedCalendarAction
} from 'Universal/actions/calendars';
import {
    setEventsForDateAction
} from 'Universal/actions/events';

import styles from './index.css';

class CalendarSelect extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setSelectedCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false
        };
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
                            <BookmarkIcon style={{
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
                                    <BookmarkIcon style={{
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
        setEventsForDate: setEventsForDateAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSelect);
