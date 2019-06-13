import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.PureComponent {

    public onSearch = () => {
        //TODO update url (react router)
    }

    public render(): JSX.Element[] {
        return [
            <input type="text" aria-label="search movie" className="Search__Input" placeholder="Enter text here" />,
            <button type="button">Search</button>
        ];
    }
}

export function initSearch(): void {
    ReactDOM.render(<Search />, document.getElementById('search'));
}

