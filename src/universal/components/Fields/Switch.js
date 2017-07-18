import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Switch from 'material-ui/Switch';

class RFSwitch extends Component {
    static propTypes = {
        input: PropTypes.object
    };

    render() {
        const { input: { value, ...rest } } = this.props;

        return (
            <Switch
                checked={value}
                {...rest}
            />
        );
    }
}

export default RFSwitch;
