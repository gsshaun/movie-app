import { Box, Image, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { getMovieById } from "./ApiService";
import { MovieExt } from "../interfaces/Movie";

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID?: string }>();
  const [movie, setMovie] = useState<MovieExt | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbID) {
      return;
    }
    getMovieById(imdbID)
      .then((data) => {
        if (data.Response === "False") {
          setError(data.Error || "Something went wrong. Please try again later.");
        } else {
          setMovie(data);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
  }, [imdbID]);

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
    <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
      <Box mb={4}>
        <Image src={movie.Poster} alt={`${movie.Title} poster`} maxH={800} />
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
