import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import BookmarkIcon from 'material-ui-icons/Bookmark';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';

import {
    setSelectedCalendarAction
} from 'Universal/actions/calendars';
import {
    setEventsForDateAction
} from 'Universal/actions/events';

import styles from './index.css';

const classes = {
    icon: {
        root: styles.icon
    },
    listItemText: {
        root: styles.listItemText
    }
};

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
            open: false
        };
    }

    handleClickListItem = () => {
        this.setState({
            open: !this.state.open
        });
    };

    handleCalendarSelect = (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        this.props.setSelectedCalendar(this.props.calendars.list[index]);
    };

    render() {
        const selected = this.props.calendars.selected || {};

        return (
            <div className={styles.root}>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="calendar-menu"
                    aria-label="Calendar"
                    onClick={this.handleClickListItem}
                    disabled={!selected.id}
                >
                    <ListItemIcon>
                        <BookmarkIcon style={{
                            fill: selected.backgroundColor || 'currentColor'
                        }} classes={classes.icon} />
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <span className={cx({
                                [styles.placeholder]: !selected.id
                            })}>
                                Calendar
                            </span>
                        }
                        secondary={
                            <span className={cx(
                                styles.calendarName,
                                {
                                    [styles.placeholder]: !selected.id
                                })}>
                                {selected.summary || 'NONE'}
                            </span>
                        }
                    />

                    <ListItemIcon>
                        {
                            this.state.open ? (
                                <ExpandLessIcon style={{
                                    fill: 'currentColor'
                                }} classes={classes.icon} />
                            ) : (
                                <ExpandMoreIcon style={{
                                    fill: 'currentColor'
                                }} classes={classes.icon} />
                            )
                        }

                    </ListItemIcon>
                </ListItem>

                <Collapse in={this.state.open}>
                    {
                        this.props.calendars.list.map((calendar, index) => (
                            <ListItem
                                button
                                key={index}
                                data-index={index}
                                onClick={this.handleCalendarSelect}
                                selected={calendar.id === selected.id}
                            >
                                <ListItemIcon>
                                    <BookmarkIcon style={{
                                        fill: calendar.backgroundColor
                                    }} classes={classes.icon} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={calendar.summary}
                                    classes={classes.listItemText}
                                />
                            </ListItem>)
                        )
                    }
                </Collapse>
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
