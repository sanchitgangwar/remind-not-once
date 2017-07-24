import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {
    setSelectedCalendarAction
} from 'Universal/actions/calendars';
import {
    setEventsForDateAction
} from 'Universal/actions/events';
import {
    showSnackbarAction
} from 'Universal/actions/snackbar';
import api from 'Universal/utils/api';

import DateSelect from './DateSelect';
import Event from './Event';
import Drawer from './Drawer';

import styles from './index.css';

const loadingStyle = {
    color: 'rgba(0, 0, 0, 0.5)'
};

class EventsList extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        date: PropTypes.object,
        events: PropTypes.object.isRequired,
        setDefaultCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired,
        showSnackbar: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.calendars.selected.id) {
            this.getEvents(
                this.props.calendars.selected.id,
                this.props.date.value
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        const areCalendarsSame = nextProps.calendars.selected.id ===
            this.props.calendars.selected.id;
        const areDatesSame = nextProps.date.value === this.props.date.value;

        console.log('C: ', areCalendarsSame);
        console.log('D: ', areDatesSame);

        if (!areCalendarsSame || !areDatesSame) {
            if (nextProps.calendars.selected.id) {
                this.getEvents(
                    nextProps.calendars.selected.id,
                    nextProps.date.value
                );
            } else if (this.props.calendars.selected.id) {
                this.getEvents(
                    this.props.calendars.selected.id,
                    this.props.date.value
                );
            }

            this.setState({
                events: []
            });
        }
    }

    getEvents(calendarId, date) {
        api.get({
            path: `/api/calendars/${calendarId}/events`,
            query: {
                date
            }
        }).then((response) => {
            this.props.setEventsForDate({
                date,
                events: response
            });
        }, () => {
            this.props.showSnackbar({
                message: 'Could not get events.'
            });
        });
    }

    render() {
        const { events: allEvents, date } = this.props;
        const events = allEvents && allEvents[this.props.date.value];

        return (
            <div>
                <Drawer />
                <div>
                    <DateSelect />

                    {
                        !events
                            ? <Typography
                                style={loadingStyle} type="subheading" align="center">
                                    Loading
                            </Typography>
                            : (
                                events.length
                                    ? events.map((event, index) => (
                                        <Event
                                            key={index}
                                            details={event}
                                            calendarId={this.props.calendars.selected.id}
                                            date={date.value}
                                        />
                                    ))
                                    : <Typography
                                        style={loadingStyle} type="subheading" align="center">
                                        No events
                                    </Typography>
                            )
                    }

                    <Link to="/create" className={styles.addButton}>
                        <Button fab color="accent">
                            <AddIcon />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        calendars: state.calendars,
        events: state.events,
        date: state.date
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setDefaultCalendar: setSelectedCalendarAction,
        setEventsForDate: setEventsForDateAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
