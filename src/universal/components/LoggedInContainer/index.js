import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route, Switch } from 'react-router-dom';
import moment from 'moment';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';

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
    toggleDrawerAction
} from 'Universal/actions/drawer';
import {
    setSelectedCalendarAction,
    setSelectedDateAction
} from 'Universal/actions/filters';
import localStorage from 'Universal/utils/localStorage';
import UserMenu from './UserMenu';

import LogoFull from '../../../../assets/images/LogoFull_228.png';
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
        location: PropTypes.object.isRequired,
        toggleDrawer: PropTypes.func.isRequired
    };

    componentDidMount() {
        const lsCalendar = localStorage.get('calendar');
        if (lsCalendar) {
            this.props.setSelectedCalendar(lsCalendar);
        }

        if (!this.props.calendars.list.length) {
            api.get({
                path: '/api/calendars/list'
            }).then((response) => {
                if (!lsCalendar) {
                    this.props.setSelectedCalendar(response[0]);
                }

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

    toggleDrawer = () => {
        this.props.toggleDrawer();
    }

    render() {
        return (
            <div className={styles.root}>
                <AppBar style={{
                    backgroundColor: '#fcfcfc',
                    height: 65
                }} className={styles.appBar}>
                    <Toolbar style={{ paddingLeft: 4 }}>

                        {
                            this.props.location.pathname === '/' ? (
                                <IconButton
                                    onClick={this.toggleDrawer}
                                >
                                    <MenuIcon />
                                </IconButton>
                            ) : <div className={styles.menuSpacer} />
                        }

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
        showSnackbar: showSnackbarAction,
        toggleDrawer: toggleDrawerAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInContainer);
