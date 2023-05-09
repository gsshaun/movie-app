import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
      <Heading as="h1" size="xl" mb={2}>
        Error
      </Heading>
      <Text fontSize="xl" mb={2}>
        {message}
      </Text>
    </Box>
  );
};

export default ErrorPage;
