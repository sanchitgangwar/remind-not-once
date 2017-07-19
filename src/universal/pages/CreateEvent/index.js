import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import TextField from 'Universal/components/Fields/TextField';
import TaskInputs from './TaskInputs';
import OccurrenceInputs from './OccurrenceInputs';
import validate from './validate';

import styles from './index.css';

class CreateEvent extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Paper className={styles.root}>
                <div>
                    <Typography
                        type="headline"
                        className={styles.formHeader}>
                        Create Event
                    </Typography>

                    <form>
                        <Field name="eventName"
                            component={TextField}
                            label="Group name"
                            required={true}
                        />

                        <FieldArray name="tasks" component={TaskInputs} />

                        <FieldArray name="tasks2" component={OccurrenceInputs} />
                    </form>
                </div>
            </Paper>
        );
    }
}

const selector = formValueSelector('createEvent');
function mapStateToProps(state) {
    return {
        tasks: selector(state, 'tasks')
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'createEvent',
    initialValues: {
        eventName: '',
        tasks: [{ name: '' }]
    },
    destroyOnUnmount: false,
    validate
})(CreateEvent));
