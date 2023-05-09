export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  export interface MovieExt extends Movie {
    Plot: string;
    Director: string;
    Actors: string;
  }

  export interface MovieExtOrError extends MovieExt {
    Response?: string;
    Error?: string;
  }
