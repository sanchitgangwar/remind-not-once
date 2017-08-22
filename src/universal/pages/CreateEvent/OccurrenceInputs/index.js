import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, FormSection, formValueSelector, change } from 'redux-form';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

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

const presets = [{
    label: '(7d)-(14d)',
    value: 0,
    description: 'After 7 days; after 14 days from that occurrence.'
}, {
    label: '(7d)-(7d)-(14d)',
    value: 1,
    description: `After 7 days; after 7 days from that occurrence;
        after 14 days from that occurrence.`
}, {
    label: '(7d: 2d)-(7d: 2d)-(14d: 2d)',
    value: 2,
    description: `After 7 days; after 7 days from that occurrence;
        after 14 days from that occurrence. Each occurrence lasting for 2 days.`
}];

class OccurrenceInputs extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired,
        occurrences: PropTypes.array.isRequired,
        changeFieldValue: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            // Used for automatically focussing the text input only when
            // a new task is added.
            autoFocus: false,
            presetsOpen: false
        };
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
     * Called when the Presets button is clicked.
     *
     * @param  {Object} event The event object.
     */
    handlePresetsClick = (event) => {
        event.stopPropagation();
        this.setState({
            presetsOpen: true
        });
    }

    /**
     * Called when the presets dialog backdrop is clicked.
     */
    handlePresetsClose = () => {
        this.setState({
            presetsOpen: false
        });
    };

    /**
     * Called when a preset is selected. This computes the value and sets
     * them.
     *
     * @param  {Object} event The event object.
     */
    handlePresetsSelect = (event) => {
        const { fields, meta } = this.props;
        let { dataset: { value } } = event.currentTarget;
        value = parseInt(value, 10);

        const today = moment();

        if (value === 0) {
            const dates = [
                today.add(7, 'days').format('YYYY-MM-DD'),
                today.add(14, 'days').format('YYYY-MM-DD')
            ];

            this.props.changeFieldValue(meta.form, fields.name, [{
                startDate: dates[0],
                endDate: dates[0]
            }, {
                startDate: dates[1],
                endDate: dates[1]
            }]);
        } else if (value === 1) {
            const dates = [
                today.add(7, 'days').format('YYYY-MM-DD'),
                today.add(7, 'days').format('YYYY-MM-DD'),
                today.add(14, 'days').format('YYYY-MM-DD')
            ];

            this.props.changeFieldValue(meta.form, fields.name, [{
                startDate: dates[0],
                endDate: dates[0]
            }, {
                startDate: dates[1],
                endDate: dates[1]
            }, {
                startDate: dates[2],
                endDate: dates[2]
            }]);
        } else if (value === 2) {
            this.props.changeFieldValue(meta.form, fields.name, [{
                startDate: today.add(7, 'days').format('YYYY-MM-DD'),
                endDate: today.add(1, 'days').format('YYYY-MM-DD')
            }, {
                startDate: today.add(6, 'days').format('YYYY-MM-DD'),
                endDate: today.add(1, 'days').format('YYYY-MM-DD'),
            }, {
                startDate: today.add(6, 'days').format('YYYY-MM-DD'),
                endDate: today.add(1, 'days').format('YYYY-MM-DD')
            }]);
        }

        this.setState({
            presetsOpen: false
        });
    }

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
                        firstDate={ index ? this.props.fields.get(0).startDate : null }
                        lastDate={ index ? this.props.fields.get(index - 1).startDate : null }
                        min={moment().format('YYYY-MM-DD')}
                        showError={true}
                        autoFocus={this.state.autoFocus}
                    />
                </div>

                <div className={styles.dateRoot} style={jsStyles.endDateRoot}>
                    <Field
                        name="endDate"
                        label="End date"
                        component={EnhancedDatePicker}
                        firstDate={ index ? this.props.fields.get(0).startDate : null }
                        lastDate={ index ? this.props.fields.get(index - 1).startDate : null }
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
                    rows={fields.length || 1}
                    onAdd={this.handleAdd}
                    onDelete={this.handleDelete}
                    onDeleteAll={this.handleDeleteAll}
                    getToolbarBg={this.getToolbarBg}
                    getToolbarHeading={this.getToolbarHeading}
                    rowsContainerClassName={styles.rowsContainer}
                    additionalButtons={
                        <div>
                            <Button
                                color="contrast"
                                onClick={this.handlePresetsClick}
                            >
                                Presets
                            </Button>

                            <Dialog
                                maxWidth="xs"
                                open={this.state.presetsOpen}
                                onRequestClose={this.handlePresetsClose}
                            >
                                <DialogTitle>Occurrences Presets</DialogTitle>
                                <DialogContent>
                                    <List>
                                        {
                                            presets.map((preset, index) => (
                                                <ListItem
                                                    button
                                                    key={index}
                                                    data-value={preset.value}
                                                    onClick={this.handlePresetsSelect}
                                                >
                                                    <ListItemText
                                                        onClick={this.handlePresetsRequestClose}
                                                        primary={preset.label}
                                                        secondary={preset.description}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={this.handlePresetsClose} color="primary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFieldValue: change
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceInputs);
