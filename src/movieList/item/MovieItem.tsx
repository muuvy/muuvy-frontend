import * as React from 'react';
import * as DTO from '../../dto/DTO';

import styles from './MovieItem.module.scss';

export interface MovieItemProps {
    movie: DTO.Movie;
    onOpenDetails: (id: string) => void;
}

export class MovieItem extends React.PureComponent<MovieItemProps> {

    private onOpenDetails = () => {
        this.props.onOpenDetails(this.props.movie.id);
    }

    public render(): JSX.Element {
        return <li className={styles.MovieItem}>
            <div role="button" className={styles.MovieItemButton} onClick={this.onOpenDetails}>
              <img className={styles.MovieItemCover} src={this.props.movie.imgUrl} alt="Movie Cover" />
              <h3>{this.props.movie.title}</h3>
              <div className={styles.MovieItemMetaData}><span>{this.props.movie.duration} min</span> | <span>{this.props.movie.categories.join(', ')}</span></div>
              <div className={styles.MovieItemRating}>
                <span className={styles.MovieItemRatingStar}></span>
                <span className={styles.MovieItemRatingText}>Rating: <span>{this.props.movie.rating}</span></span>
              </div>
              <div className={styles.MovieItemOpenDetailsIcon}>></div>
            </div>
        </li>;
    }
}