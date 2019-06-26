import React from 'react';

import Header from './Header';
import Navigation from './../navigation/Navigation';
import { MovieList } from './../movieList/MovieList';
import { MovieDetails } from './../detailsModal/MovieDetails';
import Search from './../search/Search';
import * as DTO from '../dto/DTO';

import styles from './Layout.module.scss'

interface LayoutState {
    selectedMovie: DTO.Movie | null;
}

export default class Layout extends React.PureComponent<{}, LayoutState> {

    constructor(props: any){
        super(props);
        this.state = {
            selectedMovie : null
        };
    }

    private getMockedMovies(): DTO.Movie[] {
        const mocks: DTO.Movie[] = [];
        for (let i = 0; i < 10; i++) {
            mocks.push({
                id: "" + i,
                title: "The Movie Title " + i,
                categories: ["Drama", "Crime"],
                duration: Math.floor(Math.random() * 180) + 1,
                rating: Math.floor(Math.random() * 10) + 1,
                imgUrl: "https://m.media-amazon.com/images/M/MV5BMTQzOTUyODMyOV5BMl5BanBnXkFtZTcwNzY2MzU1MQ@@._V1_.jpg",
                content: "The aging patriarch of an organized crime dynsty transfers control of his clandestine empire to his reluctant son."
            });
        }
        return mocks;
    }
    public render(): JSX.Element[] {
        return [
            <div className={styles.LayoutContainer}>
                <div className={styles.Header}>
                    <Header />
                </div>
                <div className={styles.Navigation}>
                    <Navigation />
                </div>
                <div className={styles.Search}>
                    <Search />
                </div>
                <div className={styles.Container}>
                    <h2 key='h2title'>Popular Movies</h2>
                    <MovieList movies={this.getMockedMovies()} onOpenDetails={(movie) => this.setState({ selectedMovie: movie })} />
                    <MovieDetails movie={this.state.selectedMovie} onPanelClose={() => this.setState({ selectedMovie: null })} />
                </div>
            </div>
        ]
    }

}