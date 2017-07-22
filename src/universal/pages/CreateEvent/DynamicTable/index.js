import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';

import DeleteIcon from 'material-ui-icons/Delete';
import DeleteSweepIcon from 'material-ui-icons/DeleteSweep';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';

import theme from 'Universal/../theme';
import styles from './index.css';

const jsStyles = {
    toolbar: {
        cursor: 'pointer',
        background: theme.palette.primary['500']
    },
    toolbarHeader: {
        color: '#fff',
        flex: '1 1 auto'
    },
    toolbarIcon: {
        fill: '#fff'
    },
    rowToolbarContent: {
        cursor: 'pointer',
        background: theme.palette.grey['50']
    },
    toolbarHeadingText: {
        overflowWrap: 'bread-word',
        width: 'calc(100% - 24px)',
        flex: '1 1 auto'
    },
    divider: {
        height: 6,
        background: 'rgba(0, 0, 0, 0)'
    },
    index: {
        width: 16
    }
};

class DynamicTable extends Component {
    static propTypes = {
        toolbarText: PropTypes.string,
        toolbarAction: PropTypes.element,
        renderRow: PropTypes.func,
        addButtonText: PropTypes.string,
        maxRows: PropTypes.number,
        minRows: PropTypes.number,
        onAdd: PropTypes.func,
        onDelete: PropTypes.func,
        onDeleteAll: PropTypes.func,
        getToolbarBg: PropTypes.func,
        getToolbarHeading: PropTypes.func
    };

    constructor(props) {
        super(props);

        const { minRows } = props;
        this.state = {
            nRows: minRows || 0,
            rootExpanded: true,
            expanded: (new Array(minRows)).fill(true), // All are expanded by default
            expandTouched: (new Array(minRows)).fill(false)
        };
    }

    /**
     * Handles deletion of a row.
     * @param  {Object} event The event object
     */
    handleDelete = (event) => {
        event.stopPropagation();
        const index = event.currentTarget.dataset.index;

        this.props.onDelete(index);
        this.setState({
            expanded: [
                ...this.state.expanded.slice(0, index),
                ...this.state.expanded.slice(index + 1)
            ],
            nRows: this.state.nRows - 1
        });
    };

    /**
     * Handles addition of a new row.
     */
    handleAdd = () => {
        const { nRows, expanded, expandTouched } = this.state;
        let newExpanded;

        if (nRows) {
            newExpanded = [
                ...expanded.slice(0, -1),
                expandTouched[nRows - 1] ? expanded[nRows - 1] : false,
                true
            ];
        } else {
            newExpanded = [true];
        }

        this.props.onAdd();
        this.setState({
            expanded: newExpanded,
            expandTouched: [
                ...expandTouched,
                false
            ],
            nRows: this.state.nRows + 1
        });
    }

    /**
     * Handles deletion of all rows.
     * @param  {Object} event The event object.
     */
    handleDeleteAll = (event) => {
        event.stopPropagation(); /* Necessary because we don't want the click to
                                propagate to the toolbar which has its own
                                click handler. */
        const { minRows } = this.props;

        this.props.onDeleteAll();
        this.setState({
            expanded: (new Array(minRows)).fill(true),
            expandTouched: (new Array(minRows)).fill(false),
            nRows: minRows
        });
    };

    /**
     * Called when a row is collapsed/expanded.
     *
     * @param  {Object} event The event object.
     */
    handleRowExpandToggle = (event) => {
        event.stopPropagation();
        const index = event.currentTarget.dataset.index;
        const { expanded, expandTouched } = this.state;

        this.setState({
            expanded: [
                ...expanded.slice(0, index),
                !expanded[index],
                ...expanded.slice(index + 1)
            ],
            expandTouched: [
                ...expandTouched.slice(0, index),
                true,
                ...expandTouched.slice(index + 1)
            ]
        });
    };

    /**
     * Called when the table is collapsed/expanded.
     *
     * @param  {Object} event The event object.
     */
    handleRootExpandToggle = (event) => {
        event.stopPropagation();
        this.setState({
            rootExpanded: !this.state.rootExpanded
        });
    };

    renderRow(index) {
        let toolbarStyle = jsStyles.rowToolbarContent;
        if (this.props.getToolbarBg) {
            toolbarStyle = {
                ...toolbarStyle,
                background: this.props.getToolbarBg(index)
            };
        }

        return (
            <div key={index}>
                <Paper>
                    <div className={styles.rowHeader}>
                        <Toolbar>
                            <Typography style={jsStyles.index}>
                                { index + 1 }
                            </Typography>
                        </Toolbar>

                        <Toolbar
                            className={styles.rowHeaderContent}
                            style={toolbarStyle}
                            data-index={index}
                            onClick={this.handleRowExpandToggle}
                        >
                            <Typography style={jsStyles.toolbarHeadingText}>
                                { this.props.getToolbarHeading &&
                                    this.props.getToolbarHeading(index) }
                            </Typography>

                            {
                                this.props.minRows && (index < this.props.minRows) ? null : (
                                    <IconButton
                                        data-index={index}
                                        onClick={this.handleDelete}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )
                            }

                            <div className={styles.expandButton}>
                                <IconButton
                                    data-index={index}
                                    onClick={this.handleRowExpandToggle}
                                >
                                    {
                                        this.state.expanded[index] ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )
                                    }
                                </IconButton>
                            </div>
                        </Toolbar>
                    </div>

                    <Collapse
                        in={this.state.expanded[index]}
                        unmountOnExit
                    >
                        { this.props.renderRow(index) }
                    </Collapse>
                </Paper>

                <Divider style={jsStyles.divider}></Divider>
            </div>
        );
    }

    render() {
        const { nRows } = this.state;

        const rows = [];
        for (let i = 0; i < nRows; ++i) {
            rows.push(this.renderRow(i));
        }

        return (
            <div className={styles.root}>
                <Paper>
                    <Toolbar style={jsStyles.toolbar} onClick={this.handleRootExpandToggle}>
                        <Typography style={jsStyles.toolbarHeader}>
                            { this.props.toolbarText }
                        </Typography>

                        <IconButton onClick={this.handleDeleteAll}>
                            <DeleteSweepIcon style={jsStyles.toolbarIcon} />
                        </IconButton>

                        <div className={styles.expandButton}>
                            <IconButton
                                onClick={this.handleRootExpandToggle}
                            >
                                {
                                    this.state.rootExpanded ? (
                                        <ExpandLessIcon style={jsStyles.toolbarIcon} />
                                    ) : (
                                        <ExpandMoreIcon style={jsStyles.toolbarIcon} />
                                    )
                                }
                            </IconButton>
                        </div>
                    </Toolbar>
                </Paper>

                <Collapse
                    in={this.state.rootExpanded}
                    unmountOnExit
                >
                    <div className={styles.rowsContainer}>
                        { rows }
                    </div>

                    <div className={styles.addContainer}>
                        <Button
                            raised
                            color="primary"
                            onClick={this.handleAdd}
                            disabled={this.props.maxRows === nRows}
                        >
                            { this.props.addButtonText }
                        </Button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default DynamicTable;
