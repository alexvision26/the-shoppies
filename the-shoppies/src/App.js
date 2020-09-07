import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./App.scss";

//http://img.omdbapi.com/?apikey=f2c699d1&

// Search Link: http://omdbapi.com/?apikey=f2c699d1&t=[Movie Title]

//http://www.omdbapi.com/?i=tt3896198&apikey=f2c699d1

function App() {

  // const [movieSearch, setMovieSearch] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [noms, setNoms] = useState({})

  const [isResults, setIsResults] = useState(false)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    axios.get('').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }, [])

  const handleChange = e => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleSearch = e => {
    e.preventDefault()
    console.log(searchTerm)

    axios.get(`http://omdbapi.com/?apikey=f2c699d1&t=${searchTerm}`).then(res => {
      setIsResults(true)
      setMovie(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <div className="navbar">
        <form className="searchbar">
          <input id="movie-search" onChange={handleChange}></input>
          <button onClick={handleSearch} >Search</button>
        </form>
      </div>

      {isResults ? <div className="results">
        <h2>Results:</h2>
        <div className="full-card">
            <div className="movie-card" style={{backgroundImage: `url(${movie.Poster})`}}></div>
          
            <div className="details">
              <h2>{movie.Title}</h2>
              <p>{movie.Year} <span className="rating">{movie.Rated}</span> {movie.Runtime}</p>
              <p>Cast: {movie.Actors}<br/> Director: {movie.Director}<br/> {movie.Genre}</p>
              <p></p>
              <p></p>
            </div>

          </div>
      </div> : <></>}
    </div>
  );
}

export default App;
