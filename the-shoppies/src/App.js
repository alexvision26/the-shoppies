import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./App.scss";
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

import MoviesContainer from './components/MoviesContainer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {

  const history = useHistory();

  const [noms, setNoms] = useState([])
  const [isResults, setIsResults] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [movie, setMovie] = useState({})

  const [re, setRe] = useState(false)

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()

    axios.get(`http://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${searchTerm}`).then(res => {
      setIsResults(true)
      setMovie(res.data)
      // console.log(res.data)
      
    }).catch(err => {
      console.log(err)
    })
  }

  const handleNominate = e => {
    setNoms([...noms, movie])

    localStorage.setItem(movie.Title, JSON.stringify(movie))
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/welcome">
            <Landing/>
          </Route>

          <Route path="/">
            
              <div className="navbar">
                <div className="logo">
                <h1>The Shoppies</h1>
                </div>

                <form className="searchbar">
                  <input id="movie-search" onChange={handleChange}></input>
                  <button onClick={handleSearch}>&#128269;</button>
                </form>
                  
                  <div className="links">
                    <Link to="/">Find Movies</Link>
                    <Link to="/dashboard">Nominations</Link>
                  </div>
              </div>


              {localStorage.length >= 5 ? <div style={{textAlign:"center", padding:"1% 0", backgroundColor:"#96bf48", color:"white", fontSize:"1.5rem"}}>Thank you for nominating 5 movies!</div> : <></>}
              <Route exact path="/">
                <MoviesContainer movie={movie} isResults={isResults} handleNominate={handleNominate} handleChange={handleChange} handleSearch={handleSearch}/>
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
