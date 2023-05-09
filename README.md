# Movie App - Search and discover your favorite movies

A web application that allows users to search for movies, view their details and save to favorites.

## Features

- Search for movies by title
- View movie details, including poster, plot, director and actors
- Add to and remove from favorites

## Technologies Used

- React
- Chakra UI
- Axios
- Local Storage
- React Context
- React Icon

## APIs Used

- [OMDb API](http://www.omdbapi.com/)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/gsshaun/movie-app.git`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the `.env.example` file and set your **OMDb API key**
4. Start the development server: `vite`
5. Open [http://localhost:5173/](http://localhost:5173/) in your browser

## Favorites
The app allows users to add movies to their favorites. The favorites are saved in local storage, so the user can view them even after closing the app. The AddToFavorites and RemoveFavorites functions are responsible for adding and removing movies from favorites.

## Context
The SearchContext component manages the state of the search term and search results. It uses the useState hook to keep track of the movies and search term, and the useContext hook to provide the state to the SearchBox and MovieDetail components. The context also allows components to update the state, as demonstrated in the SearchBox component.
