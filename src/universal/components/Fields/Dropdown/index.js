import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';

import styles from './index.css';

class RFDropdown extends Component {
    static propTypes = {
        label: PropTypes.string,
        input: PropTypes.object,
        meta: PropTypes.object,
        source: PropTypes.array.isRequired
    };

    static defaultProps = {
        meta: {},
        input: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
            value: this.props.input.value || this.props.source[0].value
        };
    }

    handleLabelClick = (event) => {
        event.preventDefault();
        event.target.blur();

        this.setState({
            anchorEl: event.target,
            open: true
        });
    }

    handleRequestClose = (value) => {
        if (typeof value === 'string') {
            this.props.input.onChange(value);
        }

        this.setState({
            open: false
        });
    }

    render() {
        const {
            label,
            input: {
                value
            },
            source,
            meta,
            ...custom
        } = this.props;

        let selectedLabel;
        for (let i = source.length - 1; i >= 0; --i) {
            if (source[i].value === value) {
                selectedLabel = source[i].label;
                break;
            }
        }

        return (
            (
                <div className={styles.root}>
                    <TextField
                        onClick={this.handleLabelClick}
                        label={label}
                        value={selectedLabel}
                        fullWidth={true}
                        className={styles.input}
                        {...custom}
                    />
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                    >
                        {
                            source.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    selected={option.value === value}
                                    onClick={() => this.handleRequestClose(option.value)}
                                >
                                    { option.label }
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </div>
            )
        );
    }
}

export default RFDropdown;
