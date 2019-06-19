import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBox, PrimaryButton} from 'office-ui-fabric-react';

class Search extends React.PureComponent {

    public onSearch = () => {
        //TODO update url (react router)
    }

    public render(): JSX.Element[] {
        return [
            <SearchBox
                key='SearchBox'
                placeholder="Search a Movie here"
                onSearch={newValue => console.log('value is ' + newValue)}
                onFocus={() => console.log('onFocus called')}
                onBlur={() => console.log('onBlur called')}
                onChange={() => console.log('onChange called')}
            />,
            <PrimaryButton
                key='SearchButton'
                text="Search"
                onClick={this.onSearch}
          />
        ];
    }
}

export function initSearch(): void {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
