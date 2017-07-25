import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {
    setSelectedCalendarAction
} from 'Universal/actions/filters';
import {
    setEventsForDateAction
} from 'Universal/actions/events';
import {
    showSnackbarAction
} from 'Universal/actions/snackbar';
import resizeHandler from 'Universal/utils/resizeHandler';
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
        filters: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        drawer: PropTypes.object.isRequired,
        setSelectedCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired,
        showSnackbar: PropTypes.func.isRequired
    };

    componentWillUnmount() {
        this.resizeInstance.unsubscribe(this.handleResize);
    }

    componentWillReceiveProps(nextProps) {
        const areCalendarsSame = nextProps.filters.calendar.id ===
            this.props.filters.calendar.id;
        const areDatesSame = nextProps.filters.date.value === this.props.filters.date.value;

        if (!areCalendarsSame || !areDatesSame) {
            if (nextProps.filters.calendar.id) {
                this.getEvents(
                    nextProps.filters.calendar.id,
                    nextProps.filters.date.value
                );
            } else if (this.props.filters.calendar.id) {
                this.getEvents(
                    this.props.filters.calendar.id,
                    this.props.filters.date.value
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

    renderEvents(events) {
        const { filters: { status, date } } = this.props;
        const eventsToRender = [];

        events.forEach((event, index) => {
            if ((status === 'COMPLETED' && !event.incomplete.length) ||
                (status === 'INCOMPLETE' && event.incomplete.length) ||
                (status === 'ALL')) {
                eventsToRender.push(
                    <Event
                        key={index}
                        details={event}
                        view={this.props.filters.status}
                        calendarId={this.props.filters.calendar.id}
                        date={date.value}
                    />
                );
            }
        });

        if (eventsToRender.length) {
            return eventsToRender;
        }

        return (
            <Typography
                style={loadingStyle} type="subheading" align="center"
            >
                No events
            </Typography>
        );
    }

    render() {
        const { events: allEvents, filters: { date }, drawer } = this.props;
        const events = allEvents && allEvents[date.value];
        const width = resizeHandler.getInstance().getDimensions().width;

        return (
            <div>
                <Drawer />

                <div className={cx(styles.contentWrapper, {
                    [styles.marginLeft]: width > 1000 && drawer.open
                })}>
                    <div className={styles.contentContainer}>
                        <DateSelect />

                        {
                            !events
                                ? <Typography
                                    style={loadingStyle} type="subheading" align="center">
                                        Loading
                                </Typography>
                                : this.renderEvents(events)
                        }

                        <Link to="/create" className={styles.addButton}>
                            <Button fab color="accent">
                                <AddIcon />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        events: state.events,
        filters: state.filters,
        drawer: state.drawer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedCalendar: setSelectedCalendarAction,
        setEventsForDate: setEventsForDateAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
