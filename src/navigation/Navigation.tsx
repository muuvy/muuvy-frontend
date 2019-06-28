import React from 'react';

import { NavButton } from './button/NavButton';
import { Nav, Panel, PanelType, INavLink } from 'office-ui-fabric-react';

interface NavigationProps {
    onNavigationClick: (navigationTarget: string | undefined) => void;
}

interface NavigationState {
    showNavigationPane: boolean;
}

export default class Navigation extends React.PureComponent<NavigationProps, NavigationState> {

    constructor(props: NavigationProps) {
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

    public navigateToFavourites = (navigationTarget: string | undefined) => {
        this.props.onNavigationClick(navigationTarget);
        this.setState({
            showNavigationPane: false
        });
    }

    public onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
        if (item !== null && item !== undefined) {
            this.navigateToFavourites(item.key);
        }
    }

    private renderNavigationContent(): JSX.Element {
        return <Nav
            selectedKey="key3"
            onLinkClick={(ev, item) => this.onLinkClick(ev, item)}
            groups={[
                {
                    links: [
                        {
                            name: 'Top Rated',
                            url: '#',
                            key: 'top-rated',
                        },
                        {
                            name: 'Coming Soon',
                            url: '#',
                            key: 'coming-soon',
                        },
                        {
                            name: 'Most Popular',
                            url: '#',
                            key: 'most-popular',
                        },
                        {
                            name: 'Your Profile',
                            url: '#',
                            key: 'favorites',
                            links: [
                                {
                                    name: 'Favorites',
                                    url: '#',
                                    icon: 'FavoriteStar',
                                    key: 'favorites',
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
