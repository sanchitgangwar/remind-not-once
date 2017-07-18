import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Typography from 'material-ui/Typography';
import MobileStepper from 'material-ui/MobileStepper';

import TextField from 'Universal/components/Fields/TextField';
import TaskInputs from './TaskInputs';
import validate from './validate';
import formStyles from '../index.css';

class Step1 extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        onStepComplete: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <Typography
                    type="headline"
                    className={formStyles.formHeader}>
                    Name & tasks
                </Typography>

                <form>
                    <Field name="eventName"
                        component={TextField}
                        label="Group name"
                        required={true}
                    />

                    <FieldArray name="tasks" component={TaskInputs} />

                    <MobileStepper
                        type="text"
                        steps={3}
                        position="static"
                        className={formStyles.stepper}
                        activeStep={1}
                        onBack={() => null}
                        onNext={this.props.handleSubmit(this.props.onStepComplete)}
                        disableBack={true}
                        disableNext={false}
                    />
                </form>
            </div>
        );
    }
}

const selector = formValueSelector('names');
function mapStateToProps(state) {
    return {
        tasks: selector(state, 'tasks')
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'names',
    initialValues: {
        eventName: '',
        tasks: [{ name: '' }]
    },
    destroyOnUnmount: false,
    validate
})(Step1));
