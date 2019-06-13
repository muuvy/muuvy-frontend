import React from 'react';
import ReactDOM from 'react-dom';
import { NavButton } from './button/NavButton';

interface NavigationState {
    showNavigationPane: boolean;
}

class Navigation extends React.PureComponent<{}, NavigationState> {

    constructor(props: any) {
        super(props)
        this.state = {
            showNavigationPane: false
        }
    }

    public openNavigation = () => {
        this.setState({
            showNavigationPane: true
        });
    }

    public render(): JSX.Element {
        return <NavButton onClick={this.openNavigation} />
    }
}

export function initNavigation(): void {
    ReactDOM.render(<Navigation />, document.getElementById('navigation'));
}

