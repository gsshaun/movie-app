import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import MovieGrid from "./MovieGrid";
import { searchMovies } from "./ApiService";
import SearchContext from "../Context/SearchContext ";

const SearchBox: React.FC = () => {
  const { movies, setMovies, searchTerm, setSearchTerm } =
    useContext(SearchContext);

  const handleSearch = async () => {
    const response = await searchMovies(searchTerm);
    setMovies(response.Search);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      maxW={{ base: "100%", lg: "1200px" }}
      mx="auto"
      my={8}
      p={4}
      borderWidth={1}
      borderRadius={8}
    >
      <FormControl>
        <Input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={handleInputChange}
          mb={4}
          size="lg"
        />
        <Button colorScheme="blue" onClick={handleSearch} mb={4} size="lg">
          Search
        </Button>
      </FormControl>
      {movies && movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <Text>No movies available.</Text>
      )}
    </Box>
  );
};

export default SearchBox;
