import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import styles from './index.css';

class RFTextField extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        meta: PropTypes.object.isRequired,
        input: PropTypes.object
    };

    render() {
        const {
            label,
            input,
            meta: {
                touched,
                error
            },
            ...custom
        } = this.props;

        return (
            (
                <TextField
                    error={Boolean(touched && error)}
                    label={label}
                    helperText={touched && error}
                    fullWidth={true}
                    className={styles.root}
                    helperTextClassName={styles.helperText}
                    {...input}
                    {...custom}
                />
            )
        );
    }
}

export default RFTextField;
