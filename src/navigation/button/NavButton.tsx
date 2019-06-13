import React from 'react';
import styles from './NavButton.module.scss';

export interface NavButtonProps {
    onClick: () => void;
}

export class NavButton extends React.PureComponent<NavButtonProps> {

    public render(): JSX.Element {
        return <button title="Open close Navigation" className={styles.NavButton} onClick={this.props.onClick}></button>;
    }
}
