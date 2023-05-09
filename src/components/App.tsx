import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SearchBox from "./Home";
import MovieDetail from "./MovieDetail";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={SearchBox} />
          <Route path="/:imdbID" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
