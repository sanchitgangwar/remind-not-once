import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import moment from 'moment';

import List, { ListItem, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import NavigateBeforeIcon from 'material-ui-icons/NavigateBefore';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';

import {
    setSelectedDateAction
} from 'Universal/actions/filters';

import styles from './index.css';

class DateSelect extends Component {
    static propTypes = {
        date: PropTypes.object.isRequired,
        setSelectedDate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    /**
     * Returns the label to be displayed for a given date.
     *
     * @param  {Object} date The moment object for the given date.
     * @return {String}      The label for the given date.
     */
    getLabel(date) {
        const diff = date.diff(moment().startOf('day'), 'days');

        let label;
        if (diff === 0) {
            label = 'Today';
        } else if (diff === 1) {
            label = 'Tomorrow';
        } else if (diff > 1) {
            label = `After ${diff} days`;
        } else if (diff === -1) {
            label = 'Yesterday';
        } else if (diff < -1) {
            label = `${-1 * diff} days ago`;
        }

        return label;
    }

    handlePrev = () => {
        const { date: { value } } = this.props;
        const date = moment(value).startOf('day').subtract(1, 'days');

        this.props.setSelectedDate({
            label: this.getLabel(date),
            value: date.format('YYYY-MM-DD')
        });
    };

    handleNext = () => {
        const { date: { value } } = this.props;
        const date = moment(value).add(1, 'days');

        this.props.setSelectedDate({
            label: this.getLabel(date),
            value: date.format('YYYY-MM-DD')
        });
    };

    render() {
        const { date: { value, label } } = this.props || {};
        const date = moment(value, 'YYYY-MM-DD').format('DD MMM, YYYY');

        return (
            <div className={styles.root}>
                <IconButton onClick={this.handlePrev} >
                    <NavigateBeforeIcon />
                </IconButton>

                <List className={styles.button}>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="date-menu"
                        aria-label="Date"
                        disabled={!value}
                    >
                        <ListItemText
                            style={{ paddingRight: 0 }}
                            primary={
                                <span className={cx({
                                    [styles.placeholder]: !value
                                })}>
                                    { label }
                                </span>
                            }
                            secondary={
                                <span className={cx({
                                    [styles.placeholder]: !value
                                })}>
                                    { date }
                                </span>
                            }
                        />
                    </ListItem>
                </List>

                <IconButton onClick={this.handleNext} >
                    <NavigateNextIcon />
                </IconButton>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        date: state.filters.date
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedDate: setSelectedDateAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSelect);
