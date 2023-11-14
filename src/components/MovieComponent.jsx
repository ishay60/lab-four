import React from "react";
import { MovieItem, MovieTitle, MovieImage } from "./MovieListContainer";

export const MovieComponent = ({ id, name, pic }) => {
  return (
    <>
      <MovieItem>
        <MovieTitle>
          {id}. {name}
        </MovieTitle>
        <MovieImage src={pic} alt={name} />
      </MovieItem>
    </>
  );
};
