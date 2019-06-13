import React from 'react';
import {IconButton} from 'office-ui-fabric-react';

export interface NavButtonProps {
    onClick: () => void;
}

export class NavButton extends React.PureComponent<NavButtonProps> {

    public render(): JSX.Element {
        return <IconButton iconProps={{ iconName: 'CollapseMenu' }} title="Menu" ariaLabel="Open Menu" onClick={this.props.onClick} />;
    }
}
