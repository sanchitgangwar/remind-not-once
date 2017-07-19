import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-toolbox/lib/date_picker';

import styles from './index.css';

class RFDatePicker extends Component {
    static propTypes = {
        label: PropTypes.string,
        input: PropTypes.object,
        meta: PropTypes.object
    };

    render() {
        const {
            label,
            input,
            meta,
            ...custom
        } = this.props;

        return (
            <DatePicker
                label={label}
                className={styles.datepicker}
                inputClassName={styles.label}
                ref={(datepicker) => { this.datepicker = datepicker; }}
                {...input}
                {...custom}
            />
        );
    }
}

export default RFDatePicker;
