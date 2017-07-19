import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormSection, Field } from 'redux-form';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'Universal/components/Fields/TextField';
import Dropdown from 'Universal/components/Fields/Dropdown';
import DatePicker from 'Universal/components/Fields/DatePicker';

import DeleteIcon from 'material-ui-icons/Delete';
import DeleteSweepIcon from 'material-ui-icons/DeleteSweep';


import styles from './index.css';
import jsStyles from './styles.js';

const startOptions = [
    { value: 'today', label: 'today' },
    { value: 'last', label: 'last occurrence' },
    { value: 'first', label: 'first occurrence' }
];

class OccurrenceInputs extends Component {
    static propTypes = {
        fields: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            dropdownAnchorEl: null,
            dropdownOpen: false
        };
    }

    handleDropdownClick = (event) => {
        this.setState({
            dropdownAnchorEl: event.target,
            dropdownOpen: true
        });
    };

    handleDropdownRequestClose = () => {
        this.setState({
            dropdownOpen: false
        });
    };

    renderRow(fields, occurrence, index) {
        return (
            <TableRow className={styles.tableRow}>
                <TableCell>
                    <Field
                        name="days"
                        label="Days"
                        type="number"
                        component={TextField}
                        placeholder="Days"
                        style={jsStyles.textField}
                        required={true}
                    />
                </TableCell>

                <TableCell>
                    <Typography>
                        days from
                    </Typography>
                </TableCell>

                <TableCell>
                    <Field
                        name="from"
                        component={Dropdown}
                        source={startOptions}
                    />
                </TableCell>

                <TableCell compact className={styles.orCell}>
                    <Typography>OR</Typography>
                </TableCell>

                <TableCell>
                    <Field
                        name="date"
                        label="Date"
                        component={DatePicker}
                        autoOk={true}
                    />
                </TableCell>

                <TableCell>
                    <IconButton
                        aria-label="Done All"
                        onClick={() => fields.remove(index)}
                        disabled={index === 0}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }

    render() {
        const { fields } = this.props;

        return (
            <div className={styles.tableInputsRoot}>
                <Toolbar style={jsStyles.toolbar}>
                    <Typography style={jsStyles.toolbarHeader}>
                        { fields.length } { fields.length === 1 ? 'OCCURRENCE' : 'OCCURRENCES' } ADDED
                    </Typography>

                    <div className={styles.spacer}></div>
                    <IconButton onClick={() => {
                        fields.removeAll();
                    }}>
                        <DeleteSweepIcon style={jsStyles.toolbarIcon} />
                    </IconButton>
                </Toolbar>

                <Table className={styles.table}>
                    <TableBody>
                        {
                            fields.map((occurrence, index) => (
                                <FormSection name={occurrence} key={index}>
                                    { this.renderRow(fields, occurrence, index) }
                                </FormSection>
                            ))
                        }
                    </TableBody>
                </Table>

                <div className={styles.tableFooter}>
                    <Button
                        raised
                        color="primary"
                        onClick={() => fields.push({
                            from: fields.length ? fields.get(fields.length - 1).from : 'today'
                        })}
                    >
                        Add occurrence
                    </Button>
                </div>
            </div>
        );
    }
}

export default OccurrenceInputs;
