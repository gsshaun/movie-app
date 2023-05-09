import { Box, Flex, Center, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { Movie } from "../interfaces/Movie";
interface Props {
  movies: Movie[];
}

const MovieGrid: React.FC<Props> = ({ movies }) => {
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
            </Box>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default MovieGrid;
