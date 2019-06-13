import * as React from 'react';
import * as DTO from '../dto/DTO';
import { MovieItem } from './item/MovieItem';

import styles from './MovieList.module.scss';


export interface MovieListProps {
    movies: DTO.Movie[];
    onOpenDetails: (movie: DTO.Movie) => void;
}

export class MovieList extends React.PureComponent<MovieListProps> {

    private renderMovies(): JSX.Element[] {
        return this.props.movies.map((movie: DTO.Movie): JSX.Element => {
            return <MovieItem movie={movie} onOpenDetails={this.props.onOpenDetails} key={movie.id} />;
        });
    }

    public render(): JSX.Element {
        return <ul className={styles.MovieList}>
            {this.renderMovies()}
        </ul>
    }
}