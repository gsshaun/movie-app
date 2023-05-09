import axios from "axios";
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_API_URL = import.meta.env.VITE_OMDB_API_URL;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  Director: string;
  Actors: string;
  Response?: string;
  Error?: string;
}

interface SearchResult {
  Search: Movie[];
}

export const searchMovies = async (searchTerm: string): Promise<SearchResult> => {
  const response = await axios.get(`${OMDB_API_URL}?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
  return response.data;
};

export const getMovieById = async (imdbID: string): Promise<Movie> => {
  const response = await axios.get(`${OMDB_API_URL}?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  return response.data;
};