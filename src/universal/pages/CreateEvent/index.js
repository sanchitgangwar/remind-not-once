import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import { showSnackbarAction } from 'Universal/actions/snackbar';
import TextField from 'Universal/components/Fields/TextField';
import api from 'Universal/utils/api';
import TaskInputs from './TaskInputs';
import OccurrenceInputs from './OccurrenceInputs';
import validate from './validate';

import styles from './index.css';

class CreateEvent extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        showSnackbar: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

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
                message: 'Event created.'
            });
            this.props.history.push('/');
        }, () => {
            this.props.showSnackbar({
                message: 'Could not create event.'
            });
        });
    };

    render() {
        return (
            <Paper className={styles.root}>
                <Typography
                    type="headline"
                    className={styles.formHeader}>
                    Create Event
                </Typography>

                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <Field name="eventName"
                        component={TextField}
                        label="Group name"
                        required={true}
                    />

                    <FieldArray name="tasks" component={TaskInputs} />

                    <FieldArray name="occurrences" component={OccurrenceInputs} />

                    <div className={styles.footer}>
                        <Link to="/" className={styles.cancelLink}>
                            <Button disabled={this.props.submitting}>
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            raised
                            color="accent"
                            type="submit"
                            disabled={this.props.submitting}
                        >
                            Create event
                        </Button>
                    </div>
                </form>
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSnackbar: showSnackbarAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'createEvent',
    initialValues: {
        eventName: '',
        tasks: [{ name: '' }],
        occurrences: [{
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD')
        }]
    },
    destroyOnUnmount: true,
    validate
})(CreateEvent));
