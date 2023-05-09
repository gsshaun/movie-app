import { Movie } from "../interfaces/Movie";
import { LS_FAVORITE_MOVIE } from "../constants/constants";

const getMoviesLS = () => {
  // get existing favorites from local storage or create an empty array if none exist
  const favorites: Movie[] = JSON.parse(
    localStorage.getItem(LS_FAVORITE_MOVIE) || "[]"
  );
  return favorites;
};

export const AddToFavorites = (movie: Movie) => {
  const favorites: Movie[] = getMoviesLS();

  // check if the movie is already in favorites
  const movieIndex = favorites.findIndex((fav) => fav.imdbID === movie.imdbID);

  if (movieIndex == -1) {
    // if the movie is not already in favorites, add it to the array
    favorites.push(movie);

    // save updated favorites array to local storage
    localStorage.setItem(LS_FAVORITE_MOVIE, JSON.stringify(favorites));
  }

  console.log(favorites);
};

export const RemoveFavorites = (movie: Movie) => {
  const favorites: Movie[] = getMoviesLS();

  const movieIndex = favorites.findIndex((fav) => fav.imdbID === movie.imdbID);

  if (movieIndex !== -1) {
    favorites.splice(movieIndex, 1);
    localStorage.setItem(LS_FAVORITE_MOVIE, JSON.stringify(favorites));
  }

  console.log(favorites);
};
