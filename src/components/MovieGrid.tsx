import {
  Box,
  Flex,
  Center,
  Image,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Movie } from "../interfaces/Movie";
import { AddToFavorites, RemoveFavorites } from "../services/Favorites";
import { LS_FAVORITE_MOVIE } from "../constants/constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

  const isMovieIdAvailable = (movie: Movie) => {
    return favorites.some((mv) => mv.imdbID == movie.imdbID);
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
              position="relative"
            >
              <Image
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                maxH={400}
              />
              <IconButton
                position="absolute"
                top={2}
                right={2}
                colorScheme={isMovieIdAvailable(movie) ? "green" : "gray"}
                onClick={(event) => {
                  isMovieIdAvailable(movie)
                    ? handleRemoveFavorites(movie)
                    : handleAddToFavorites(movie);
                  event.preventDefault();
                }}
                aria-label={""}
                icon={isMovieIdAvailable(movie) ? <FaHeart /> : <FaRegHeart />}
              />
              <Center mt={2}>
                <Heading as="h2" size="md" mb={2}>
                  {movie.Title}
                </Heading>
              </Center>
              <Text fontSize="sm" mb={2}>
                {movie.Year} ({movie.Type})
              </Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default MovieGrid;
