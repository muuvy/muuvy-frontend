import * as React from 'react';
import * as DTO from '../../dto/DTO';

import styles from './MovieItem.module.scss';
import { Icon } from 'office-ui-fabric-react';

export interface MovieItemProps {
    movie: DTO.Movie;
    onOpenDetails?: (movie: DTO.Movie) => void;
}

export class MovieItem extends React.PureComponent<MovieItemProps> {

    private onOpenDetails = () => {
        if(this.props.onOpenDetails) {
            this.props.onOpenDetails(this.props.movie);
        }
    }

    private renderOpenDetails(): JSX.Element | null {
        if(this.props.onOpenDetails) {
            return <div className={styles.MovieItemOpenDetailsIcon}>></div>;
        }
        return null;
    }

    public render(): JSX.Element | null {
        if (this.props.movie == null) {
            return null;
        }
        return <li className={styles.MovieItem}>
            <div role="button" className={styles.MovieItemButton} onClick={this.onOpenDetails}>
              <img className={styles.MovieItemCover} src={this.props.movie.imgUrl} alt="Movie Cover" />
              <h3>{this.props.movie.title}</h3>
              <div className={styles.MovieItemMetaData}><span>{this.props.movie.duration} min</span> | <span>{this.props.movie.categories.join(', ')}</span></div>
              <div className={styles.MovieItemRating}>
                <Icon className={styles.MovieItemRatingStar} iconName='FavoriteStarFill' />
                <span className={styles.MovieItemRatingText}>Rating: <span>{this.props.movie.rating}</span></span>
              </div>
              {this.renderOpenDetails()}
            </div>
        </li>;
    }
}