import React, { useState, useEffect, useRef } from "react";
import { getPic } from "../utils/getPic";
import { MovieComponent } from "./MovieComponent";
import { MovieListContainer, MovieSelect } from "./MovieListContainer";

export const MovieList = () => {
  const [moviesWithImages, setMoviesWithImages] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const movieRefs = useRef({});

  useEffect(() => {
    const initialList = [
      {
        id: 1,
        name: "Under the Dome",
        pic: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      },
      {
        id: 2,
        name: "Person of Interest",
        pic: "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg",
      },
      {
        id: 3,
        name: "Bitten",
        pic: "https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg",
      },
    ];

    const fetchImages = async () => {
      const moviesWithPics = await Promise.all(
        initialList.map(async (movie) => {
          const picUrl = await getPic(movie.pic);
          return { ...movie, pic: picUrl };
        })
      );

      setMoviesWithImages(moviesWithPics);
    };

    fetchImages();
  }, []);

  const handleSelectMovie = (e) => {
    const movieId = e.target.value;
    setSelectedMovieId(movieId);
    if (movieRefs.current[movieId]) {
      movieRefs.current[movieId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <MovieListContainer>
        <h3>Movie List</h3>
        <MovieSelect value={selectedMovieId} onChange={handleSelectMovie}>
          <option value="">Select a Movie</option>
          {moviesWithImages.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.name}
            </option>
          ))}
        </MovieSelect>

        {moviesWithImages.map((movie) => (
          <div key={movie.id} ref={(el) => (movieRefs.current[movie.id] = el)}>
            <MovieComponent id={movie.id} name={movie.name} pic={movie.pic} />
          </div>
        ))}
      </MovieListContainer>
    </>
  );
};
