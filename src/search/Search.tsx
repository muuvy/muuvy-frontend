import React, { useContext, Fragment } from 'react';
import { SearchBox } from 'office-ui-fabric-react';

import TMDBAPI from '../tmdb-api';
import { UserContext } from "../context";
import { User, Movie } from '../dto/DTO';

interface SearchProps {
    onSearchResult: (movies: Movie[]) => void;
}

export default function Search(props: SearchProps) {
    const user: User = useContext(UserContext).user;

    async function onSearch(searchValue: string) {
        try {
            const searchRes = await TMDBAPI.get('/search/movie?query=' + searchValue + '&api_key=' + user.apiKey);

            const movies: Movie[] = [];
            searchRes.data.results.forEach((m: any) => {
                movies.push(
                    {
                        id: m.id,
                        title: m.title,
                        duration: 1,
                        categories: m.genre_ids,
                        rating: m.vote_average,
                        imgUrl: 'https://image.tmdb.org/t/p/original' + m.poster_path,
                        content: m.overview
                    }
                )
            });

            props.onSearchResult(movies);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <SearchBox
                key='SearchBox'
                placeholder="Search a Movie here"
                onSearch={searchValue => onSearch(searchValue)}
                onFocus={() => console.log('onFocus called')}
                onBlur={() => console.log('onBlur called')}
            />
        </Fragment>
    );
}
