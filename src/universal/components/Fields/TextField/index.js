import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import styles from './index.css';

class RFTextField extends Component {
    static propTypes = {
        label: PropTypes.string,
        meta: PropTypes.object,
        input: PropTypes.object,
        showError: PropTypes.bool,
        autoSelectOnFocus: PropTypes.bool
    };

    static defaultProps = {
        meta: {},
        input: {}
    };

    handleFocus = (event, ...rest) => {
        const { meta: { touched }, autoSelectOnFocus } = this.props;
        if (autoSelectOnFocus && !touched) {
            event.target.select();
        }

        this.props.input.onFocus(event, ...rest);
    };

    render() {
        const {
            label,
            input,
            meta: {
                touched,
                error
            },
            showError,
            autoSelectOnFocus,
            ...custom
        } = this.props;

        return (
            (
                <TextField
                    error={Boolean((touched || showError) && error)}
                    label={label}
                    helperText={(showError || touched) && error}
                    fullWidth={true}
                    className={styles.root}
                    helperTextClassName={styles.helperText}
                    {...input}
                    {...custom}
                    onFocus={this.handleFocus}
                />
            )
        );
    }
}

export default RFTextField;
