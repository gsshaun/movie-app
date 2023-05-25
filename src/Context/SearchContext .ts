import React, { createContext } from "react";
import { Movie } from "../interfaces/Movie";

// interface SearchContextProps {
//   movies: Movie[];
//   setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
//   searchTerm: string;
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
// }

const SearchContext = createContext<{
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}>({
  movies: [],
  setMovies: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
});

export default SearchContext;
