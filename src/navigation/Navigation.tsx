import React from 'react';

import { NavButton } from './button/NavButton';
import {Nav, Panel, PanelType} from 'office-ui-fabric-react';


interface NavigationState {
    showNavigationPane: boolean;
}

export default class Navigation extends React.PureComponent<{}, NavigationState> {

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

    private renderNavigationContent(): JSX.Element {
        return <Nav
            selectedKey="key3"
            groups={[
                {
                  links: [
                    {
                        name: 'Top Rated',
                        url: 'http://cnn.com',
                        key: 'key1',
                        target: '_blank'
                    },
                    {
                        name: 'Coming Soon',
                        url: 'http://cnn.com',
                        key: 'key2',
                        target: '_blank'
                    },
                    {
                        name: 'Most Popular',
                        url: 'http://cnn.com',
                        key: 'key3',
                        target: '_blank'
                    },
                    {
                      name: 'Your Profile',
                      url: 'http://example.com',
                      links: [
                        {
                          name: 'Favorite',
                          url: 'http://msn.com',
                          icon: 'FavoriteStar',
                          key: 'key4',
                          target: '_blank'
                        }
                      ],
                      isExpanded: true
                    }
                  ]
                }
              ]}
        ></Nav>
    }

    private onDismiss = () => {
        this.setState({
            showNavigationPane: false
        });
    }

    public render(): JSX.Element[] {
        return [
            <NavButton key='NavButton' onClick={this.openNavigation} />,
            <Panel
                key='NavPanel'
                isOpen={this.state.showNavigationPane}
                type={PanelType.smallFixedFar}
                onDismiss={this.onDismiss}
                isLightDismiss={true}
                onLightDismissClick={this.onDismiss}
                headerText="Menu"
                closeButtonAriaLabel="Close"
            >{this.renderNavigationContent()}</Panel>
        ];
    }
}

