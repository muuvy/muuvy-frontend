import * as React from 'react';
import * as DTO from '../dto/DTO';
import { MovieItem } from './item/MovieItem';

import styles from './MovieList.module.scss';

export interface MovieListProps {
    movies: DTO.Movie[] | null;
    onOpenDetails: (movie: DTO.Movie) => void;
}

export class MovieList extends React.PureComponent<MovieListProps> {

    private renderMovies(): JSX.Element[] | null {
        if (this.props.movies != null) {
            return this.props.movies.map((movie: DTO.Movie): JSX.Element => {
                return <MovieItem movie={movie} onOpenDetails={this.props.onOpenDetails} key={movie.id} />;
            });
        }
        return null;
    }

    public render(): JSX.Element {
        return <ul className={styles.MovieList}>
            {this.renderMovies()}
        </ul>
    }
}