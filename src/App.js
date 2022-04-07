import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Movies from './components/Movies.js';
import './App.css';

export default function App() {
  const [movies, movieState] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState(1);

  const { ref: myRef, inView: myElementIsVisible } = useInView();
  
  
  const getMoreMovies = async () => {
    if (page != 1)
    {
    console.log(page)
    const apiKey = '&apikey=7342635e';
    const url = 'https://www.omdbapi.com/?s=';
    const pageNumber = `&page=${page}`;
    const search = url + movieName + apiKey + pageNumber;

    const { data } = await axios.get(search);
    
    //data.data.totalResults
    const m = [ ...movies, ...data.Search ];
    console.log(m)
    movieState(m);
    }
};

  function incrementPage()
  {
    setPage(page + 1);
  }
  
  useEffect (() => {
    if (myElementIsVisible)
    {
      incrementPage();
    }
  }, [myElementIsVisible]);

  useEffect (() => {
    if (page != 1)
    {
      getMoreMovies();
    }
  }, [page]);


  // where movie data is stored for each search
  const getMovies = async (event) => {
    // sending a resopnse to our own apiKey
    event.preventDefault();
    const apiKey = '&apikey=7342635e';
    const url = 'https://www.omdbapi.com/?s=';
    const search = url + movieName + apiKey;
    
    // once a response is received, we then save the data
    const data = await axios.get(search);
    console.log(data)
    //data.data.totalResults
    movieState(data.data.Search);
    setPage(1);
  };

  // If the user has not searched a movie this will render
  if (!movies) {
    return (
      <main>
        <header>
          <p>GETFLIX</p>
        </header>
        <div className="form">
          <form onSubmit={getMovies}>
            <label>
              <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Search the movie here"
                data-testid="input-element"
              />
            </label>
            <button type="submit" data-testid="button-element"><i aria-label="search" className="fa fa-search" /></button>
          </form>
        </div>

      </main>
    );
  }
  // Once there is movie data this will render
  if (movies) {
    return (
      <main data-testid="rendering">
        <header>
          <p>GETFLIX</p>
        </header>
        <div className="form">
          <form onSubmit={getMovies}>
            <label>
              <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
            </label>
            <button type="submit"><i aria-label="search" className="fa fa-search" /></button>
          </form>
        </div>
        <Movies className="moviesSection" movies={movies} />
        <div ref={myRef}>hello</div>
      </main>
    );
  }
}

