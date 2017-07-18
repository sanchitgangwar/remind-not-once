import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import Paper from 'material-ui/Paper';

import Step1 from './Step1';
import Step2 from './Step2';
import styles from './index.css';

class CreateEvent extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    handleStepComplete = (step) => {
        this.props.history.push(`/create?step=${step + 1}`);
    };

    render() {
        let { step } = queryString.parse(this.props.location.search);

        if (!step) {
            return (
                <Redirect to="/create?step=1" />
            );
        }

        step = parseInt(step, 10);

        let Step;

        if (step === 1) {
            Step = Step1;
        } else if (step === 2) {
            Step = Step2;
        } else if (step === 3) {
            Step = Step2;
        } else {
            return (
                <Redirect to="/create?step=1" />
            );
        }

        return (
            <Paper className={styles.root}>
                <Step onStepComplete={this.handleStepComplete.bind(this, step)} />
            </Paper>
        );
    }
}

export default CreateEvent;
