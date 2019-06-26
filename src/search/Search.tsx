import React, { useContext } from 'react';
import { SearchBox, PrimaryButton } from 'office-ui-fabric-react';

import TMDBAPI from '../tmdb-api';
import { UserContext } from "../context";
import { User } from '../dto/DTO';


export default function Search() {
    const user: User = useContext(UserContext).user;

    function onSearch() {
        TMDBAPI.get('/search?api_key=' + user.apiKey);
    }

    return (
        <div>
            <SearchBox
                key='SearchBox'
                placeholder="Search a Movie here"
                onSearch={newValue => console.log('value is ' + newValue)}
                onFocus={() => console.log('onFocus called')}
                onBlur={() => console.log('onBlur called')}
                onChange={() => console.log('onChange called')}
            />
            <PrimaryButton
                key='SearchButton'
                text="Search"
                onClick={() => onSearch()}
            />
        </div>
    );
}
