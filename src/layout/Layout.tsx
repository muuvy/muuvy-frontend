import React, { useContext, useState } from 'react';

import Header from './Header';
import Navigation from './../navigation/Navigation';
import { MovieList } from './../movieList/MovieList';
import MovieDetails from './../detailsModal/MovieDetails';
import Search from './../search/Search';
import * as DTO from '../dto/DTO';
import API from '../muuvy-api';
import TMDBAPI from '../tmdb-api';

import styles from './Layout.module.scss'
import { UserContext } from '../context';

export default function Layout() {
    const user: DTO.User = useContext(UserContext).user;
    const [selectedMovie, setSelectedMovie] = useState<DTO.Movie | null>(null);
    const [movies, setMovies] = useState<DTO.Movie[]>(getMockedMovies());
    const [pageTitle, setPageTitle] = useState<string>('Popular Movies');

    async function setMoviesForLink(link: string | undefined) {
        console.log(link);
        if (link !== undefined) {
            setPageTitle(link);
            if (link === 'favorites') {
                let favorites = await getFavorites();
                let tmdbMovies: DTO.Movie[] = [];
                if (favorites != null) {
                    for (const favorite of favorites) {
                        let tmdbMovie: any = await getTmdbMovieById(favorite.movieId);
                        console.log(tmdbMovie);
                        if (tmdbMovie != null) {
                            tmdbMovies.push(
                                {
                                    id: tmdbMovie.id,
                                    title: tmdbMovie.title,
                                    duration: tmdbMovie.runtime,
                                    categories: tmdbMovie.genres.map((g: any) => g.name + ""),
                                    rating: tmdbMovie.vote_average,
                                    imgUrl: 'https://image.tmdb.org/t/p/original' + tmdbMovie.poster_path,
                                    content: tmdbMovie.overview
                                }
                            )
                        }
                    }
                    setMovies(tmdbMovies);
                    return;
                }
            } else {
                setMovies(getMockedMovies());
            }
        }
    }

    async function getTmdbMovieById(movieId: string) {
        try {
            let result = await TMDBAPI.get(`/movie/${movieId}?api_key=${user.apiKey}`);
            return result.data;
        }
        catch (httpError) {
            console.log(httpError);
        }
        return null;
    }

    async function getFavorites() {
        try {
            let result = await API.get(`/users/${user.id}/favourites`);
            return result.data;
        }
        catch (httpError) {
            console.log(httpError);
        }
        return null;
    }

    function getMockedMovies(): DTO.Movie[] {
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

    return (
        <div className={styles.LayoutContainer}>
            <div className={styles.Header}>
                <Header />
            </div>
            <div className={styles.Navigation}>
                <Navigation onNavigationClick={(link) => setMoviesForLink(link)} />
            </div>
            <div className={styles.Search}>
                <Search onSearchResult={(searchRes) => setMovies(searchRes)} />
            </div>
            <div className={styles.Container}>
                <h2 key='h2title'>{pageTitle}</h2>
                <MovieList movies={movies} onOpenDetails={(movie) => setSelectedMovie(movie)} />
                <MovieDetails movie={selectedMovie} onPanelClose={() => setSelectedMovie(null)} />
            </div>
        </div>
    );
}
