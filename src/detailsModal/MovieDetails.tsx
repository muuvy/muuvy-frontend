import * as React from 'react';
import * as DTO from '../dto/DTO';
import {Panel, PanelType, ActionButton} from 'office-ui-fabric-react';
import { MovieItem } from '../movieList/item/MovieItem';

import styles from './MovieDetails.module.scss';

export interface MovieDetailsProps {
    movie: DTO.Movie | null;
    onPanelClose: () => void;
}

export class MovieDetails extends React.PureComponent<MovieDetailsProps> {

    private closePanel = (): void => {
        this.props.onPanelClose();
    }

    private renderMovieContent(): JSX.Element | null {
        if (this.props.movie != null){
            return <div className={styles.MovieDetailsContent}>{this.props.movie.content as String}</div>;
        }
        return null;
    }

    public render(): JSX.Element {
        return <Panel
            isOpen={this.props.movie !== null}
            type={PanelType.smallFluid}
            onDismiss={this.closePanel}
        >
            <MovieItem movie={this.props.movie as DTO.Movie} />
            {this.renderMovieContent()}
            <ActionButton iconProps={{iconName: 'AddFavorite'}} text='Add to Watchlist' /> 
        </Panel>;
    }
}