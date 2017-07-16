import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from 'material-ui/Typography';

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

import CalendarSelect from './CalendarSelect';
import Event from './Event';
// import styles from './index.css';

const loadingStyle = {
    color: 'rgba(0, 0, 0, 0.5)'
};

function getTodaysDate() {
    const d = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

class EventsList extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        date: PropTypes.string,
        events: PropTypes.object.isRequired,
        setDefaultCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired,
        showSnackbar: PropTypes.func.isRequired
    };

    static defaultProps = {
        date: getTodaysDate()
    };

    componentDidMount() {
        if (this.props.calendars.selected.id) {
            this.getEvents(this.props.calendars.selected.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.calendars.selected.id !==
            this.props.calendars.selected.id) {
            if (nextProps.calendars.selected.id) {
                this.getEvents(nextProps.calendars.selected.id);
            }

            this.setState({
                events: []
            });
        }
    }

    getEvents(calendarId) {
        const date = getTodaysDate();

        api.get({
            path: `/api/calendars/${calendarId}/events/list`,
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
        const { events: allEvents } = this.props;
        const events = allEvents && allEvents[this.props.date];

        return (
            <div>
                <CalendarSelect />

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
                                        id={event.id}
                                        summary={event.summary}
                                        calendarId={this.props.calendars.selected.id}
                                        completed={event.completed}
                                        incomplete={event.incomplete}
                                    />
                                ))
                                : <Typography
                                    className={loadingStyle} type="subheading" align="center">
                                    No events
                                </Typography>
                        )
                }
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
        setDefaultCalendar: setSelectedCalendarAction,
        setEventsForDate: setEventsForDateAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
