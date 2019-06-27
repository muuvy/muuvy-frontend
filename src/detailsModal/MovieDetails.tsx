import React, { useContext, useState, useEffect } from 'react';

import * as DTO from '../dto/DTO';
import { Panel, PanelType, ActionButton } from 'office-ui-fabric-react';
import { MovieItem } from '../movieList/item/MovieItem';
import { UserContext } from "../context";
import API from '../muuvy-api';

import styles from './MovieDetails.module.scss';

export interface MovieDetailsProps {
    movie: DTO.Movie | null;
    onPanelClose: () => void;
}

export default function MovieDetails(props: MovieDetailsProps) {
    const user: DTO.User = useContext(UserContext).user;
    const [isFavourite, setIsFavourite] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setIsFavourite(checkIsFavourite());
    });

    function closePanel() {
        props.onPanelClose();
    }

    function renderMovieContent(): JSX.Element | null {
        if (props.movie != null) {
            return <div className={styles.MovieDetailsContent}>{props.movie.content as string}</div>;
        }
        return null;
    }

    function checkIsFavourite(): boolean {
        if (props.movie != null) {
            let movieId = props.movie.id;
            console.log('isFavorite = ' + user.favorites.some(favourite => favourite['movieId'] === movieId))
            return user.favorites.some(favourite => favourite['movieId'] === movieId);
        }
        return false;
    }

    async function handleWatchlistAction() {
        if (props.movie != null) {
            if (isFavourite) {
                console.log("Removing movie id: " + props.movie.id + " to favourites of user id: " + user.id);
                try {
                    await API.delete(`/users/${user.id}/favourites/${props.movie.id}`)
                        .then(() => {
                            if (props.movie != null) {
                                let movieId = props.movie.id;
                                user.favorites = user.favorites.filter((item) => {
                                    return item.movieId !== movieId;
                                })

                                setIsFavourite(false);
                            }
                        })
                }
                catch (httpError) {
                    console.log(httpError);
                }
            } else {
                console.log("Adding movie id: " + props.movie.id + " to favourites of user id: " + user.id);
                try {
                    await API.post(`/users/${user.id}/favourites`, {
                        movieId: props.movie.id
                    })
                        .then(() => {
                            if (props.movie != null) {
                                user.favorites.push({ movieId: props.movie.id });
                                setIsFavourite(true);
                            }
                        })
                }
                catch (httpError) {
                    console.log(httpError);
                }
            }
        }
    }

    return (
        <Panel
            isOpen={props.movie !== null}
            type={PanelType.smallFluid}
            onDismiss={closePanel}
        >
            <MovieItem movie={props.movie as DTO.Movie} />
            {renderMovieContent()}

            <ActionButton
                iconProps={{ iconName: isFavourite ? 'AddFavoriteFill' : 'AddFavorite' }}
                text={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                onClick={() => handleWatchlistAction()} />
        </Panel>
    );
}
