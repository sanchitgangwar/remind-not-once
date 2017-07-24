import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { FormSection, Field, formValueSelector } from 'redux-form';
import lightGreen from 'material-ui/colors/lightGreen';
import pink from 'material-ui/colors/pink';

import TextField from 'Universal/components/Fields/TextField';
import Switch from 'Universal/components/Fields/Switch';
import theme from 'Universal/../theme';

import DynamicTable from '../DynamicTable';
import styles from './index.css';

const jsStyles = {
    rowContent: {
        background: theme.palette.grey['50']
    }
};

class TaskInputs extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        tasks: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            // Used for automatically focussing the text input only when
            // a new task is added.
            autoFocus: false
        };
    }

    /**
     * Returns the background to be set on a row's toolbar.
     *
     * @param  {Integer} index The index of the row.
     * @return {String} A valid CSS color string.
     */
    getToolbarBg = (index) => {
        const field = this.props.fields.get(index);
        if (field && field.completed) {
            return lightGreen['50'];
        }

        return pink['50'];
    }

    /**
     * Passed as a param to DynamicTable. Returns the heading to be rendered
     * on a row's toolbar.
     *
     * @param  {Integer} index The index of the row.
     * @return {String}
     */
    getToolbarHeading = (index) => {
        const field = this.props.fields.get(index);

        if (field && field.name) {
            return field.name;
        }

        return '';
    }

    /**
     * Handles deletion of a row.
     *
     * @param  {Integer} index The index of the row.
     */
    handleDelete = (index) => {
        this.props.fields.remove(index);
    };

    /**
     * Handles deletion of all the rows.
     */
    handleDeleteAll = () => {
        this.props.fields.removeAll();
        this.props.fields.push({
            name: 'Untitled task'
        });
    };

    /**
     * Handles addition of a row.
     */
    handleAdd = () => {
        this.setState({
            autoFocus: true
        });

        this.props.fields.push({
            name: 'Untitled task'
        });
    };

    /**
     * Passed as a param to DynamicTable. Called when DynamicTable is
     * rendering rows.
     *
     * @param  {Integer} index The index of the row being rendered.
     * @return {Element}
     */
    renderRow = index => (
        <FormSection name={`${this.props.fields.name}[${index}]`}>
            <div className={styles.rowContent} style={jsStyles.rowContent}>
                <div className={styles.textInput}>
                    <Field
                        name="name"
                        label="Task name"
                        component={TextField}
                        placeholder="Task name"
                        style={jsStyles.textField}
                        required={true}
                        autoSelectOnFocus={true}
                        autoFocus={this.state.autoFocus}
                    />
                </div>

                <div className={styles.switch}>
                    <Field
                        name="completed"
                        label="Completed"
                        component={Switch}
                    />
                </div>
            </div>
        </FormSection>
    );

    render() {
        const { fields } = this.props;
        const toolbarText = `${fields.length} ${fields.length === 1 ? 'TASK' : 'TASKS'} ADDED`;

        return (
            <div>
                <DynamicTable
                    toolbarText={toolbarText}
                    addButtonText="ADD TASK"
                    renderRow={this.renderRow}
                    minRows={1}
                    maxRows={30}
                    rows={fields.length || 1}
                    onAdd={this.handleAdd}
                    onDelete={this.handleDelete}
                    onDeleteAll={this.handleDeleteAll}
                    getToolbarBg={this.getToolbarBg}
                    getToolbarHeading={this.getToolbarHeading}
                />
            </div>
        );
    }
}

const selector = formValueSelector('createEvent');
function mapStateToProps(state) {
    return {
        tasks: selector(state, 'tasks')
    };
}

export default connect(mapStateToProps)(TaskInputs);
