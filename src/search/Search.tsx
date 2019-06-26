import React from 'react';
import {SearchBox, PrimaryButton} from 'office-ui-fabric-react';

import TMDBAPI from '../tmdb-api';


export default class Search extends React.PureComponent {

    public onSearch = () => {
        TMDBAPI.get('/search?api_key=');
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
