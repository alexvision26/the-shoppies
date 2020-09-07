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
              {localStorage.getItem(movie.Title) ? <><h3 style={{color: "#96bf48"}}>&#10003; Thanks for nominating this title!</h3></> : <a href="#" className="nom-button" onClick={props.handleNominate}>Nominate!</a>}
            </div>

          </div>
      </div> : <><h1>Use the search bar above to find a movie!</h1></>}
      </>
    )
}

export default MoviesContainer;