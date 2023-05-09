import React, { createContext } from "react";
import { Movie } from "../interfaces/Movie";

interface SearchContextProps {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps>({
  movies: [],
  setMovies: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
});

export default SearchContext;