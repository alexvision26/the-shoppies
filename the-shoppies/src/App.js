import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./App.scss";
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

import MoviesContainer from './components/MoviesContainer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//http://img.omdbapi.com/?apikey=f2c699d1&

// Search Link: http://omdbapi.com/?apikey=f2c699d1&t=[Movie Title]

//http://www.omdbapi.com/?i=tt3896198&apikey=f2c699d1

function App() {

  const [noms, setNoms] = useState({})
  const [isResults, setIsResults] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [movie, setMovie] = useState({})

  const handleChange = e => {
    setSearchTerm(e.target.value)
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
    <Router>
      <div className="App">
        <Switch>
          <Route path="/welcome">
            <Landing/>
          </Route>

          {/* <Route exact path="/" component={MoviesContainer}/> */}

          <Route path="/">
            
              <div className="navbar">
                <h1>The Shoppies</h1>
                  <form className="searchbar">
                    <input id="movie-search" onChange={handleChange}></input>
                    <button onClick={handleSearch} >Search</button>
                  </form>
              </div>
              <Route exact path="/">
                <MoviesContainer movie={movie} isResults={isResults}/>
              </Route>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
          </Route>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
