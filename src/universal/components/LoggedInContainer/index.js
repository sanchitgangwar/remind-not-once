import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route, Switch } from 'react-router-dom';
import moment from 'moment';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import EventsList from 'Universal/pages/EventsList';
import CreateEvent from 'Universal/pages/CreateEvent';
import api from 'Universal/utils/api';
import {
    setCalendarsListAction
} from 'Universal/actions/calendars';
import {
    showSnackbarAction
} from 'Universal/actions/snackbar';
import {
    setSelectedCalendarAction,
    setSelectedDateAction
} from 'Universal/actions/filters';
import UserMenu from './UserMenu';

import LogoFull from '../../../../assets/images/LogoFull.svg';
import styles from './index.css';

class LoggedInContainer extends Component {
    static propTypes = {
        userDetails: PropTypes.object.isRequired,
        calendars: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        setSelectedCalendar: PropTypes.func.isRequired,
        setCalendarsList: PropTypes.func.isRequired,
        setSelectedDate: PropTypes.func.isRequired,
        showSnackbar: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    };

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

        if (!this.props.filters.date.value) {
            this.props.setSelectedDate({
                value: moment().format('YYYY-MM-DD'),
                label: 'Today'
            });
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <AppBar style={{
                    backgroundColor: '#fcfcfc',
                    height: 65
                }} className={styles.appBar}>
                    <Toolbar>
                        <Link to="/" className={styles.logoContainer}>
                            <img src={LogoFull} className={styles.logo} />
                        </Link>

                        <UserMenu />
                    </Toolbar>
                </AppBar>

                <div className={styles.contentContainer}>
                    <Switch>
                        <Route exact path="/" component={EventsList} />
                        <Route exact path="/create" component={CreateEvent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.user.details,
        calendars: state.calendars,
        filters: state.filters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedCalendar: setSelectedCalendarAction,
        setCalendarsList: setCalendarsListAction,
        setSelectedDate: setSelectedDateAction,
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInContainer);
