import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormSection, Field } from 'redux-form';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'Universal/components/Fields/TextField';

import DeleteIcon from 'material-ui-icons/Delete';
import DeleteSweepIcon from 'material-ui-icons/DeleteSweep';

import Switch from 'Universal/components/Fields/Switch';

import theme from 'Universal/../theme';
import styles from './index.css';

const jsStyles = {
    textField: {
        marginTop: 10,
        marginBottom: 20
    },
    toolbar: {
        background: theme.palette.primary['500']
    },
    toolbarHeader: {
        color: '#fff',
        flex: '0 0 auto'
    },
    toolbarIcon: {
        fill: '#fff'
    },
    tableCell: {
        width: '100%'
    }
};

class TaskInputs extends Component {
    static propTypes = {
        fields: PropTypes.object
    };

    render() {
        const { fields } = this.props;

        return (
            <div className={styles.tasks}>
                <Toolbar style={jsStyles.toolbar}>
                    <Typography style={jsStyles.toolbarHeader}>
                        { fields.length } { fields.length === 1 ? 'TASK' : 'TASKS' } ADDED
                    </Typography>

                    <div className={styles.spacer}></div>
                    <IconButton onClick={() => {
                        fields.removeAll();
                        fields.push();
                    }}>
                        <DeleteSweepIcon style={jsStyles.toolbarIcon} />
                    </IconButton>
                </Toolbar>

                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableRow}>
                            <TableCell style={jsStyles.tableCell}>Task name</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            fields.map((task, index) => (
                                <FormSection name={task} key={index}>
                                    <TableRow className={styles.tableRow}>
                                        <TableCell>
                                            <Field
                                                name="name"
                                                label="Task name"
                                                component={TextField}
                                                placeholder="Task name"
                                                style={jsStyles.textField}
                                                required={true}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Field
                                                name="completed"
                                                component={Switch}
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
                                </FormSection>
                            ))
                        }
                    </TableBody>
                </Table>

                <div className={styles.tableFooter}>
                    <Button onClick={() => fields.push()}>
                        Add task
                    </Button>
                </div>
            </div>
        );
    }
}

export default TaskInputs;
