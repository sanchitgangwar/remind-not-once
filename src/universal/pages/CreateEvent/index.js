import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';
import cx from 'classnames';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import BookmarkIcon from 'material-ui-icons/Bookmark';
import { LinearProgress } from 'material-ui/Progress';


import { showSnackbarAction } from 'Universal/actions/snackbar';
import TextField from 'Universal/components/Fields/TextField';
import Dropdown from 'Universal/components/Fields/Dropdown';
import api from 'Universal/utils/api';
import theme from 'Universal/../theme';
import TaskInputs from './TaskInputs';
import OccurrenceInputs from './OccurrenceInputs';
import validate from './validate';

import styles from './index.css';

class CreateEvent extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        showSnackbar: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        calendars: PropTypes.object.isRequired,
        initialValues: PropTypes.object.isRequired,
        invalid: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            calendarsSource: this.getCalendarsSource(props),
            calendar: {
                id: null,
                background: theme.palette.grey['300']
            },
            submitClicked: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.calendars !== nextProps.calendars) {
            this.setState({
                calendarsSource: this.getCalendarsSource(nextProps)
            });
        }

        if (this.props.calendars.selected.id !== nextProps.calendars.selected.id) {
            this.setState({
                calendar: {
                    id: nextProps.calendars.selected.id,
                    background: nextProps.calendars.selected.backgroundColor
                }
            });
        }
    }

    /**
     * Parses the calendars list array and formats it into the form expected
     * by the Dropdown component.
     *
     * @param  {Array} object.calendars.list The array list as returned by the
     *                                       API.
     * @return {Array} The array format expected by the Dropdown component.
     */
    getCalendarsSource({ calendars: { list } }) {
        const result = [];

        list.forEach((calendar) => {
            result.push({
                label: calendar.summary,
                value: calendar.id,
                backgroundColor: calendar.backgroundColor
            });
        });

        return result;
    }

    /**
     * Render the calendar options in the calendar dropdown.
     * This function is passed as a prop to the dropdown component which calls
     * it whenever it is rendering the dropdown options.
     *
     * @param  {Object} calendar The calendar object.
     * @param  {String} calendar.label The option label (calendar summary).
     * @param  {String} calendar.backgroundColor The calendar background color.
     * @return {Element}
     */
    renderCalendarOption = calendar => (
        <div className={styles.menuItem}>
            {calendar.label}
            <BookmarkIcon style={{
                fill: calendar.backgroundColor,
                marginLeft: 10
            }} />
        </div>
    );

    /**
     * Called when the value of the calendar input is changed.
     * It sets the color the icon displayed on the calendar input.
     *
     * @param  {Object} event
     * @param  {String} calendarId The new value selected.
     */
    handleCalendarIdChange = (event, calendarId) => {
        const { calendars: { list } } = this.props;
        for (let i = list.length - 1; i >= 0; --i) {
            if (list[i].id === calendarId) {
                this.setState({
                    calendar: {
                        id: calendarId,
                        background: list[i].backgroundColor
                    }
                });

                break;
            }
        }
    };

    /**
     * Submits the form. Is called after all the fields are validated.
     *
     * @param  {Object} values The form values
     * @return {Promise}
     */
    handleSubmit = (values) => {
        const { calendarId = 'primary' } = values;
        return api.post({
            path: `/api/calendars/${calendarId}/events/create`
        }, {
            eventName: values.eventName,
            tasks: values.tasks,
            occurrences: values.occurrences
        }).then(() => {
            this.props.showSnackbar({
                message: 'Event created'
            });
            this.props.history.push('/');
        }, () => {
            this.props.showSnackbar({
                message: 'Could not create event'
            });
        });
    };

    render() {
        const { invalid, submitting, calendars } = this.props;
        const { calendarsSource, calendar } = this.state;

        return (
            <Paper>
                <div className={styles.root}>
                    <Typography
                        type="headline"
                        className={cx(styles.formHeader, {
                            [styles.placeholder]: !calendars.list.length
                        })}
                    >
                        Create Event
                    </Typography>

                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field name="eventName"
                            component={TextField}
                            label="Group name"
                            required={true}
                        />

                        <div className={styles.calendarInputContainer}>
                            <Field name="calendarId"
                                component={Dropdown}
                                label="Calendar"
                                required={true}
                                source={calendarsSource}
                                renderOption={this.renderCalendarOption}
                                onChange={this.handleCalendarIdChange}
                            />

                            <BookmarkIcon
                                className={styles.calendarInputIcon}
                                style={{
                                    fill: calendar.background
                                }} />
                        </div>

                        <FieldArray name="tasks" component={TaskInputs} />

                        <FieldArray name="occurrences" component={OccurrenceInputs} />

                        <div className={styles.footer}>
                            <Link to="/" className={styles.cancelLink}>
                                <Button disabled={submitting}>
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                raised
                                color="accent"
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                Create event
                            </Button>
                        </div>
                    </form>
                </div>

                {
                    submitting ? (<LinearProgress />) : null
                }
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        calendars: state.calendars,
        initialValues: {
            eventName: '',
            calendarId: state.calendars.selected && state.calendars.selected.id,
            tasks: [{
                name: 'Untitled task'
            }],
            occurrences: [{
                startDate: moment().format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            }]
        }
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createEvent',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    validate
})(CreateEvent));
