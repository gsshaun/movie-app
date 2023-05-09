import {
  Box,
  Flex,
  Center,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Movie } from "../interfaces/Movie";
import {
  AddToFavorites,
  RemoveFavorites
} from "../services/Favorites";
import { LS_FAVORITE_MOVIE } from "../constants/constants";
interface Props {
  movies: Movie[];
}

const MovieGrid: React.FC<Props> = ({ movies }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const setFavoritInLocalStorage = () => {
    const favoriteMovies = JSON.parse(
      // Load favorites from local storage
      localStorage.getItem(LS_FAVORITE_MOVIE) || "[]"
    );
    setFavorites(favoriteMovies);
  };
  useEffect(() => {
    setFavoritInLocalStorage();
  }, []);

  const handleAddToFavorites = (movie: Movie) => {
    AddToFavorites(movie);
    setFavoritInLocalStorage();
  };

  const handleRemoveFavorites = (movie: Movie) => {
    RemoveFavorites(movie);
    setFavoritInLocalStorage();
  };

  return (
    <Flex direction={{ base: "column", lg: "row" }} flexWrap="wrap">
      {movies.map((movie) => (
        <Box key={movie.imdbID} flex={{ base: "none", lg: "1 0 33.33%" }}>
          <Link to={`/${movie.imdbID}`}>
            <Box
              p={4}
              borderWidth={1}
              borderRadius={8}
              _hover={{ borderColor: "blue.500" }}
              cursor="pointer"
            >
              <Center mb={2}>
                <Image
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  maxH={400}
                />
              </Center>
              <Heading as="h2" size="md" mb={2}>
                {movie.Title}
              </Heading>
              <Text fontSize="sm" mb={2}>
                {movie.Year} ({movie.Type})
              </Text>
              <Button
                colorScheme="green"
                onClick={(event) => {
                  favorites.some((mv) => mv.imdbID == movie.imdbID)
                    ? handleRemoveFavorites(movie)
                    : handleAddToFavorites(movie);
                  event.preventDefault();
                }}
              >
                {favorites.some((mv) => mv.imdbID == movie.imdbID)
                  ? "Remove Favorite"
                  : "Add to Favorites"}
              </Button>
            </Box>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default MovieGrid;
