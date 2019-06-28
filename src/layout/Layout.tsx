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
            } else if (link === 'most-popular') {
                let popularMovies = await getPopularMovies();
                let tmdbMovies: DTO.Movie[] = [];
                if (popularMovies != null) {
                    for (const popularMovie of popularMovies) {
                        tmdbMovies.push(
                            {
                                id: popularMovie.id,
                                title: popularMovie.title,
                                duration: popularMovie.runtime,
                                categories: popularMovie.genre_ids,
                                rating: popularMovie.vote_average,
                                imgUrl: 'https://image.tmdb.org/t/p/original' + popularMovie.poster_path,
                                content: popularMovie.overview
                            }
                        )
                    }
                    setMovies(tmdbMovies);
                    return;
                }
            } else if (link === 'coming-soon') {
                let comingSoonMovies = await getComingSoonMovies();
                let tmdbMovies: DTO.Movie[] = [];
                if (comingSoonMovies != null) {
                    for (const comingSoonMovie of comingSoonMovies) {
                        tmdbMovies.push(
                            {
                                id: comingSoonMovie.id,
                                title: comingSoonMovie.title,
                                duration: comingSoonMovie.runtime,
                                categories: comingSoonMovie.genre_ids,
                                rating: comingSoonMovie.vote_average,
                                imgUrl: 'https://image.tmdb.org/t/p/original' + comingSoonMovie.poster_path,
                                content: comingSoonMovie.overview
                            }
                        )
                    }
                    setMovies(tmdbMovies);
                    return;
                }
            } else if (link === 'top-rated') {
                let topRatedMovies = await getTopRatedMovies();
                let tmdbMovies: DTO.Movie[] = [];
                if (topRatedMovies != null) {
                    for (const topRatedMovie of topRatedMovies) {
                        tmdbMovies.push(
                            {
                                id: topRatedMovie.id,
                                title: topRatedMovie.title,
                                duration: topRatedMovie.runtime,
                                categories: topRatedMovie.genre_ids,
                                rating: topRatedMovie.vote_average,
                                imgUrl: 'https://image.tmdb.org/t/p/original' + topRatedMovie.poster_path,
                                content: topRatedMovie.overview
                            }
                        )
                    }
                    setMovies(tmdbMovies);
                    return;
                }
            } else {
                setMovies(getMockedMovies());
            }
        }
    }

    async function getPopularMovies() {
        try {
            let result = await TMDBAPI.get(`/movie/popular?api_key=${user.apiKey}`);
            return result.data.results;
        }
        catch (httpError) {
            console.log(httpError);
        }
        return null;
    }

    async function getTopRatedMovies() {
        try {
            let result = await TMDBAPI.get(`/movie/top_rated?api_key=${user.apiKey}`);
            return result.data.results;
        }
        catch (httpError) {
            console.log(httpError);
        }
        return null;
    }

    async function getComingSoonMovies() {
        try {
            let result = await TMDBAPI.get(`/movie/upcoming?api_key=${user.apiKey}`);
            return result.data.results;
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
