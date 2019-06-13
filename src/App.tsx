import React from 'react';
import * as DTO from './dto/DTO';
import {MovieList} from './movieList/MovieList';

import './App.css';

export default class App extends React.PureComponent {
    private getMockedMovies(): DTO.Movie[] {
        const mocks: DTO.Movie[] = [];
        for(let i = 0; i < 10; i++) {
            mocks.push({
                id: "" + i,
                title: "The Movie Title " + i,
                categories: ["Drama", "Crime"],
                duration: Math.floor(Math.random() * 180) + 1,
                rating: Math.floor(Math.random() * 10) + 1,
                imgUrl: "https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ@@._V1_.jpg"
            });
        }
        return mocks;
    }

    public render(): JSX.Element[] {
        return [
            <h2>Popular Movies</h2>,
            <div className="Content">
                <MovieList movies={this.getMockedMovies()} onOpenDetails={(id) => console.log('movie clicked', id)} />
            </div>
        ];
    }
}
