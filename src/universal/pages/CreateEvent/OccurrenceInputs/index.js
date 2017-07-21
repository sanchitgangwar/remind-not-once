import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';
import theme from 'Universal/../theme';
import EnhancedDatePicker from 'Universal/components/Fields/EnhancedDatePicker';
import dateUtil from 'Universal/utils/date';

import DynamicTable from '../DynamicTable';
import styles from './index.css';

const jsStyles = {
    rowContent: {
        background: theme.palette.primary['50']
    },
    startDateRoot: {
        background: theme.palette.accent['50']
    },
    endDateRoot: {
        background: theme.palette.primary['50']
    }
};

class OccurrenceInputs extends Component {
    static propTypes = {
        fields: PropTypes.object,
        occurrences: PropTypes.array
    };

    /**
     * Passed as a param to DynamicTable. Returns the heading to be rendered
     * on a row's toolbar.
     *
     * @param  {Integer} index The index of the row.
     * @return {String}
     */
    getToolbarHeading = (index) => {
        const field = this.props.fields.get(index);
        if (!field) {
            return '';
        }

        const { startDate, endDate } = field;

        return dateUtil.displayStartEndDates(startDate, endDate);
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
     * Handles deletion of all rows.
     */
    handleDeleteAll = () => {
        this.props.fields.removeAll();
        this.props.fields.push({
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD')
        });
    };

    /**
     * Handles addition of a row.
     */
    handleAdd = () => {
        const lastField = this.props.fields.get(this.props.fields.length - 1);

        this.props.fields.push({
            startDate: lastField.endDate,
            endDate: lastField.endDate
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
                <div className={styles.dateRoot} style={jsStyles.startDateRoot}>
                    <Field
                        name="startDate"
                        label="Start date"
                        component={EnhancedDatePicker}
                        firstDate={ index ? this.props.fields.get(0).endDate : null }
                        lastDate={ index ? this.props.fields.get(index - 1).endDate : null }
                        min={moment().format('YYYY-MM-DD')}
                        showError={true}
                    />
                </div>

                <div className={styles.dateRoot} style={jsStyles.endDateRoot}>
                    <Field
                        name="endDate"
                        label="End date"
                        component={EnhancedDatePicker}
                        firstDate={ index ? this.props.fields.get(0).endDate : null }
                        lastDate={ index ? this.props.fields.get(index - 1).endDate : null }
                        startDate={ this.props.occurrences[index] &&
                            this.props.occurrences[index].startDate }
                        min={moment().format('YYYY-MM-DD')}
                        showError={true}
                    />
                </div>
            </div>
        </FormSection>
    );

    render() {
        const { fields } = this.props;
        const toolbarText =
            `${fields.length} ${fields.length === 1 ? 'OCCURRENCE' : 'OCCURRENCES'} ADDED`;

        return (
            <div>
                <DynamicTable
                    toolbarText={toolbarText}
                    addButtonText="ADD OCCURRENCE"
                    renderRow={this.renderRow}
                    minRows={1}
                    maxRows={5}
                    onAdd={this.handleAdd}
                    onDelete={this.handleDelete}
                    onDeleteAll={this.handleDeleteAll}
                    getToolbarBg={this.getToolbarBg}
                    getToolbarHeading={this.getToolbarHeading}
                    rowsContainerClassName={styles.rowsContainer}
                />
            </div>
        );
    }
}

const selector = formValueSelector('createEvent');
function mapStateToProps(state) {
    return {
        occurrences: selector(state, 'occurrences')
    };
}

export default connect(mapStateToProps)(OccurrenceInputs);
