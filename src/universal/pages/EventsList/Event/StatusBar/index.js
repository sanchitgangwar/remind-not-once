import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress } from 'material-ui/Progress';

class StatusBar extends Component {
    static propTypes = {
        nCompleted: PropTypes.number.isRequired,
        nIncomplete: PropTypes.number.isRequired
    };

    static defaultProps = {
        nCompleted: 0,
        nIncomplete: 1
    };

    render() {
        const { nCompleted, nIncomplete } = this.props;

        return (
            <LinearProgress
                mode="determinate"
                value={(nCompleted * 100) / (nCompleted + nIncomplete)}
            />
        );
    }
}

export default StatusBar;
