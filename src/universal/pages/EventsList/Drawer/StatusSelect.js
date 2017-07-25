import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import DoneIcon from 'material-ui-icons/Done';
import TimelapseIcon from 'material-ui-icons/Timelapse';
import Typography from 'material-ui/Typography';

import {
    setStatusFilterAction
} from 'Universal/actions/filters';
import {
    closeDrawerIfNotDockedAction
} from 'Universal/actions/drawer';
import theme from 'Universal/../theme';

import styles from './index.css';

const jsStyles = {
    iconSelected: {
        fill: theme.palette.primary['500']
    },
    textSelected: {
        color: theme.palette.primary['500']
    }
};

const status = [{
    label: 'All',
    value: 'ALL',
    Icon: ListIcon
}, {
    label: 'Completed',
    value: 'COMPLETED',
    Icon: DoneIcon
}, {
    label: 'Incomplete',
    value: 'INCOMPLETE',
    Icon: TimelapseIcon
}];

const classes = {
    drawer: {
        paper: styles.root
    },
    icon: {
        root: styles.icon
    },
    selected: {
        root: styles.listItemSelected
    }
};

class StatusSelect extends Component {
    static propTypes = {
        filters: PropTypes.object.isRequired,
        setStatusFilter: PropTypes.func.isRequired,
        closeDrawerIfNotDocked: PropTypes.func.isRequired
    };

    handleStatusOptionClick = (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);

        this.props.setStatusFilter(status[index].value);
        this.props.closeDrawerIfNotDocked();
    };

    render() {
        const { filters } = this.props;

        return (
            <List className={styles.listRoot}>
                {
                    status.map((item, index) => {
                        const selected = filters.status === item.value;

                        return (
                            <ListItem
                                key={index}
                                data-index={index}
                                button
                                classes={selected ?
                                    classes.selected : undefined}
                                onClick={this.handleStatusOptionClick}
                            >
                                <ListItemIcon>
                                    <item.Icon
                                        classes={classes.icon}
                                        style={selected ? jsStyles.iconSelected : undefined}
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            className={styles.listItemText}
                                            style={selected ? jsStyles.textSelected : undefined}
                                        >
                                            { item.label }
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setStatusFilter: setStatusFilterAction,
        closeDrawerIfNotDocked: closeDrawerIfNotDockedAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelect);
