import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchContext from "../context/SearchContext ";
import React, { useState } from "react";
import SearchBox from "./Home";
import MovieDetail from "./MovieDetail";
import { Movie } from "../interfaces/Movie";

const App: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <ChakraProvider>
      <SearchContext.Provider
        value={{ movies, setMovies, searchTerm, setSearchTerm }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={SearchBox} />
            <Route path="/:imdbID" element={<MovieDetail />} />
          </Routes>
        </BrowserRouter>
      </SearchContext.Provider>
    </ChakraProvider>
  );
};

export default App;
