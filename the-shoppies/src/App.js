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
  Link,
  useHistory,
} from "react-router-dom";

//http://img.omdbapi.com/?apikey=f2c699d1&

// Search Link: http://omdbapi.com/?apikey=f2c699d1&t=[Movie Title]

//http://www.omdbapi.com/?i=tt3896198&apikey=f2c699d1

function App() {

  console.log(React.version)

  const history = useHistory();

  console.log(history)

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

    axios.get(`http://omdbapi.com/?apikey=f2c699d1&t=${searchTerm}`).then(res => {
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
                <h1>The Shoppies</h1>
                  <form className="searchbar">
                    <input id="movie-search" onChange={handleChange}></input>
                    <button onClick={handleSearch}>Search</button>
                  </form>
                  <div className="links">
                    <Link to="/">Find Movies</Link>
                    <Link to="/dashboard">My Nominations</Link>
                  </div>
              </div>

              {localStorage.length >= 5 ? <div style={{textAlign:"center", padding:"2% 0", backgroundColor:"#96bf48", color:"white", fontSize:"1.5rem"}}>Thank you for nominating 5 movies!</div> : <></>}
              <Route exact path="/">
                <MoviesContainer movie={movie} isResults={isResults} handleNominate={handleNominate}/>
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
