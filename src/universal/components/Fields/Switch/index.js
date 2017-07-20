import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';

import styles from './index.css';

class RFSwitch extends Component {
    static propTypes = {
        input: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.object
    };

    render() {
        const {
            label,
            input: { value, ...restInput },
            meta,
            ...rest
        } = this.props;

        return (
            <div className={styles.root}>
                <Typography>{ label }</Typography>
                <Switch
                    checked={value}
                    {...restInput}
                    {...rest}
                />
            </div>
        );
    }
}

export default RFSwitch;
