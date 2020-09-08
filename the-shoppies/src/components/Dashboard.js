import React, { useState, useEffect } from 'react';


function Dashboard() {

    const [myNoms, setMyNoms] = useState([])

    useEffect(() => {
        let currMovies = []
        for (var i=0; i < localStorage.length; i++){
            let curr = JSON.parse(localStorage.getItem(localStorage.key(i)))
            currMovies.push(curr)
        }
        setMyNoms(currMovies)
    }, [])

    const cancelNom = (title) => {
        localStorage.removeItem(title)

        updateNoms()
    }

    const updateNoms = () => {
        let currMovies = []
        for (var i=0; i < localStorage.length; i++){
            let curr = JSON.parse(localStorage.getItem(localStorage.key(i)))
            currMovies.push(curr)
        }
        setMyNoms(currMovies)
    }
    
    return (
        <>
        <div className="container">
        <div className="noms-overlay">
        <h1>Nominated Titles:</h1>
        <div className="noms-container">
            
        {myNoms.map(movie => {
            return (
                <>
                <div className="nom-item">
                    
                    <div className="my-noms" style={{backgroundImage: `url(${movie.Poster})`, width:"300px", height:"444px"}} onClick={() => {cancelNom(movie.Title)}}><div className="overlay" style={{width:"300px", height:"444px"}}><h2>+</h2></div></div>
                    <h3>{movie.Title}</h3>
                </div>
                </>
            )
        })}
        </div>
        </div>
        </div>
        </>
    )
}

export default Dashboard;