import React from 'react';
import styles from './Header.module.scss';

export default class Header extends React.PureComponent {
    render() {
        return (
            <div className={styles.Header}>
                <img title="muuvy logo" alt="muuvy logo" className={styles.HeaderLogo} src="./logo.png" />
                <h1 className={styles.HeaderTitle}>muuvy</h1>
            </div>
        )
    }
}