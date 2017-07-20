import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Typography from 'material-ui/Typography';

import TextField from 'Universal/components/Fields/TextField';
import Dropdown from 'Universal/components/Fields/Dropdown';

import styles from './index.css';

const startOptions = [
    { value: 'today', label: 'today' },
    { value: 'last', label: 'last occurrence' },
    { value: 'first', label: 'first occurrence' }
];
const startOptionsFirst = [
    { value: 'today', label: 'today' }
];

const jsStyles = {
    or: {
        margin: '12px 0',
        background: 'rgba(0, 0, 0, 0.1)',
        padding: 12
    }
};

class EnhancedDatePicker extends Component {
    static propTypes = {
        label: PropTypes.string,
        meta: PropTypes.object.isRequired,
        input: PropTypes.object.isRequired,
        lastDate: PropTypes.string, // All date formats are YYYY-MM-DD
        firstDate: PropTypes.string,
        startDate: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            days: 0,
            startRef: startOptions[0].value
        };
    }

    handleDropdownChange = (value) => {
        const date = this.getDateFromInputs(this.state.days, value);
        this.props.input.onChange(date);
        this.setState({
            startRef: value
        });
    };

    handleDaysCountChange = (event) => {
        const date = this.getDateFromInputs(event.target.value, this.state.startRef);
        this.props.input.onChange(date);
        this.setState({
            days: event.target.value
        });
    };

    handleDateInputChange = (event) => {
        this.props.input.onChange(event.target.value);
    };

    getDateFromInputs(days, startRef) {
        let date;
        const { startDate, lastDate, firstDate } = this.props;

        if (startRef === 'start') {
            date = moment(startDate).add(days, 'days');
        } else if (startRef === 'first') {
            date = moment(firstDate).add(days, 'days');
        } else if (startRef === 'last') {
            date = moment(lastDate).add(days, 'days');
        } else if (startRef === 'today') {
            date = moment().add(days, 'days');
        }

        return date ? date.format('YYYY-MM-DD') : null;
    }

    render() {
        const {
            label,
            input,
            meta,
            firstDate,
            startDate
        } = this.props;

        let source = firstDate ? startOptions : startOptionsFirst;
        source = startDate ? [
            ...source,
            { value: 'start', label: 'start date' }
        ] : source;

        return (
            <div>
                <Typography type="title" color="accent">
                    { label }
                </Typography>

                <div>
                    <TextField
                        type="date"
                        value={input.value}
                        name={input.name}
                        onChange={this.handleDateInputChange}
                        meta={{
                            ...meta,
                            touched: true
                        }}
                    />
                </div>

                <Typography style={jsStyles.or} align="center">
                    OR
                </Typography>

                <div className={styles.bottomRoot}>
                    <div>
                        <TextField
                            name="days"
                            label="Days"
                            type="number"
                            min="0"
                            placeholder="Days"
                            required={true}
                            fullWidth={false}
                            onChange={this.handleDaysCountChange}
                        />
                    </div>

                    <div className={styles.middleText}>
                        <Typography align="center">
                            days from
                        </Typography>
                    </div>

                    <div>
                        <Dropdown
                            name="from"
                            source={source}
                            fullWidth={false}
                            input={{
                                onChange: this.handleDropdownChange,
                                value: this.state.startRef
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EnhancedDatePicker;
