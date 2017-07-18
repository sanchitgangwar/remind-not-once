import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import Typography from 'material-ui/Typography';

import formStyles from '../index.css';

class Step2 extends Component {
    static propTypes = {
        eventName: PropTypes.string
    };

    // TODO: Remove this
    static defaultProps = {
        eventName: 'Default Name'
    };

    render() {
        return (
            <div>
                <div className={formStyles.formHeader}>
                    <Typography
                        type="headline">
                        Recurrence
                    </Typography>
                    <Typography type="caption">
                        { this.props.eventName }
                    </Typography>
                </div>
            </div>
        );
    }
}

const selector = formValueSelector('names');
function mapStateToProps(state) {
    return {
        eventName: selector(state, 'eventName')
    };
}

export default connect(mapStateToProps)(Step2);
