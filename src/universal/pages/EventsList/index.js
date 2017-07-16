import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setSelectedCalendarAction
} from 'Universal/actions/calendars';
import {
    setEventsForDateAction
} from 'Universal/actions/events';

import CalendarSelect from './CalendarSelect';
import Event from './Event';
import styles from './index.css';

class EventsList extends Component {
    static propTypes = {
        calendars: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setDefaultCalendar: PropTypes.func.isRequired,
        setEventsForDate: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.calendars.selected.id !==
            this.props.calendars.selected.id) {
            this.setState({
                events: []
            });
        }
    }

    render() {
        return (
            <div>
                <CalendarSelect />

                {
                    !this.props.calendars.selected.id
                        ? <div className={styles.loader}>
                        </div>
                        : <Event />
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
        setEventsForDate: setEventsForDateAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
