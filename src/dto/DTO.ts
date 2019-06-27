export interface Movie {
    id: string;
    title: string;
    duration: number;
    categories: string[];
    rating: number;
    imgUrl: string;
    content?: string;
}

export interface User {
    id: string;
    fullName: string;
    apiKey: string;
    favorites: Favorite[];
}

export interface Favorite {
    movieId: string;
}