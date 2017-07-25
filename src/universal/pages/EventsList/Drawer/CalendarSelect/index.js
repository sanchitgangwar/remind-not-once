import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import BookmarkIcon from 'material-ui-icons/Bookmark';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';

import {
    setSelectedCalendarAction
} from 'Universal/actions/filters';
import {
    setEventsForDateAction
} from 'Universal/actions/events';
import {
    closeDrawerIfNotDockedAction
} from 'Universal/actions/drawer';
import theme from 'Universal/../theme';

import drawerStyles from '../index.css';
import styles from './index.css';

const classes = {
    icon: {
        root: styles.icon
    },
    listItemText: {
        root: styles.listItemText
    },
    selected: {
        root: styles.listItemSelected
    }
};

const jsStyles = {
    textSelected: {
        color: theme.palette.primary['500']
    },
    calendarListRoot: {
        paddingTop: 0
    }
};

class CalendarSelect extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setSelectedCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired,
        closeDrawerIfNotDocked: PropTypes.func.isRequired
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
        this.props.closeDrawerIfNotDocked();
    };

    render() {
        const selected = this.props.filters.calendar || {};

        return (
            <div>
                <List className={drawerStyles.listRoot}>
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
                                <span className={cx(drawerStyles.listItemText, {
                                    [styles.placeholder]: !selected.id
                                })}>
                                    Calendar
                                </span>
                            }
                            secondary={
                                <span
                                    className={cx(
                                        styles.calendarName,
                                        {
                                            [styles.placeholder]: !selected.id
                                        })
                                    }
                                >
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
                </List>

                <Collapse in={this.state.open}>
                    <List className={drawerStyles.listRoot} style={jsStyles.calendarListRoot}>
                        {
                            this.props.calendars.list.map((calendar, index) => {
                                const isSelected = calendar.id === selected.id;

                                return (
                                    <ListItem
                                        button
                                        key={index}
                                        data-index={index}
                                        onClick={this.handleCalendarSelect}
                                        classes={
                                            isSelected ?
                                                classes.selected :
                                                undefined
                                        }
                                    >
                                        <ListItemIcon>
                                            <BookmarkIcon style={{
                                                fill: calendar.backgroundColor
                                            }} classes={classes.icon} />
                                        </ListItemIcon>
                                        <ListItemText
                                            disableTypography
                                            primary={
                                                <Typography
                                                    className={styles.calendarText}
                                                    style={isSelected ?
                                                        jsStyles.textSelected :
                                                        undefined}
                                                >
                                                    { calendar.summary }
                                                </Typography>
                                            }
                                            classes={classes.calendarText}
                                        />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Collapse>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        calendars: state.calendars,
        events: state.events,
        filters: state.filters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedCalendar: setSelectedCalendarAction,
        setEventsForDate: setEventsForDateAction,
        closeDrawerIfNotDocked: closeDrawerIfNotDockedAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSelect);
