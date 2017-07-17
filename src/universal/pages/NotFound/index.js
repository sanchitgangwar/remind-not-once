import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';

import LogoSmall from '../../../../assets/images/LogoSmall.svg';
import styles from './index.css';

class NotFound extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.topContent}>
                    <Typography align="center" type="display4">
                        404
                    </Typography>
                    <Typography align="center" type="body1">
                        The page you are looking for is not present.
                    </Typography>
                </div>
                <div className={styles.bottomContent}>
                    <Link to="/">
                        <img src={LogoSmall} className={styles.logo} />
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotFound;
