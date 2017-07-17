import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';

import styles from './index.css';
import LogoSmall from '../../../../assets/images/LogoSmall.svg';

class Loader extends Component {
    render() {
        return (
            <div className={styles.container}>
                <img src={LogoSmall} className={styles.logo} />
                <CircularProgress className={styles.loader} size={30} />
            </div>
        );
    }
}

export default Loader;
