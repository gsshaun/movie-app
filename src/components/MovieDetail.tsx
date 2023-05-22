import {
  Box,
  Image,
  Heading,
  Text,
  Spinner,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { getMovieById } from "../service/ApiService";
import { MovieExt, Movie } from "../interfaces/Movie";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AddToFavorites, RemoveFavorites } from "../services/Favorites";
import { LS_FAVORITE_MOVIE } from "../constants/constants";

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID?: string }>();
  const [movie, setMovie] = useState<MovieExt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    if (!imdbID) {
      return;
    }
    getMovieById(imdbID)
      .then((data) => {
        if (data.Response === "False") {
          setError(
            data.Error || "Something went wrong. Please try again later."
          );
        } else {
          setMovie(data);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
  }, [imdbID]);

  useEffect(() => {
    setFavoritInLocalStorage();
  }, []);

  const setFavoritInLocalStorage = () => {
    const favoriteMovies = JSON.parse(
      // Load favorites from local storage
      localStorage.getItem(LS_FAVORITE_MOVIE) || "[]"
    );
    setFavorites(favoriteMovies);
  };

  const handleFavorites = (movie: MovieExt) => {
    isMovieIdAvailable(movie) ? RemoveFavorites(movie) : AddToFavorites(movie);
    setFavoritInLocalStorage();
  };

  const isMovieIdAvailable = (movieExt: MovieExt) => {
    return favorites.some((mv) => mv.imdbID == movieExt.imdbID);
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!movie) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box mb={4} borderWidth={5} borderRadius={10} position="relative">
        <Image src={movie.Poster} alt={`${movie.Title} poster`} maxH={800} />
        <IconButton
          position="absolute"
          top={1}
          right={1}
          colorScheme={isMovieIdAvailable(movie) ? "green" : "gray"}
          onClick={(event) => {
            handleFavorites(movie);
            event.preventDefault();
          }}
          aria-label={""}
          icon={isMovieIdAvailable(movie) ? <FaHeart /> : <FaRegHeart />}
        />
      </Box>
      <Heading as="h1" size="xl" mb={2}>
        {movie.Title}
      </Heading>
      <Text fontSize="xl" mb={2}>
        {movie.Year} ({movie.Type})
      </Text>
      <Text fontSize="md" mb={2}>
        Director: {movie.Director}
      </Text>
      <Text fontSize="md" mb={2}>
        Actors: {movie.Actors}
      </Text>
      <Text fontSize="md">{movie.Plot}</Text>
    </Box>
  );
};

export default MovieDetail;
