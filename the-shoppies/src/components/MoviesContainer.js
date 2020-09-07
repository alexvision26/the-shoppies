import React, {useEffect, useState} from 'react';
import axios from 'axios';

function MoviesContainer(props) {

    const { movie, isResults } = props;

    return (
        <>

      {isResults ? <div className="results">
        <h2>Results:</h2>
        <div className="full-card">
            <div className="movie-card" style={{backgroundImage: `url(${movie.Poster})`}}></div>
          
            <div className="details">
              <h2>{movie.Title}</h2>
              <p>{movie.Year} <span className="rating">{movie.Rated}</span> {movie.Runtime}</p>
              <p>{movie.Plot}</p>
              <p>Cast: {movie.Actors}<br/> Director: {movie.Director}<br/> <br/>{movie.Genre}</p>
              <a href="#" className="nom-button">Nominate!</a>
            </div>

          </div>
      </div> : <></>}
      </>
    )
}

export default MoviesContainer;