
import React from 'react';
import axios from 'axios';
import './Movies.css';

export default function Movies(props) {
  const Search = props.movies;
  // function that obtains specific data on each movie selected by the user
  const furtherMovieDetails = async (movieDetails) => {
    const element = document.getElementById('further');
    if (element) {
      element.remove();
    }
    const url = 'https://www.omdbapi.com/?i=';
    const imdb = movieDetails.imdbID;

    const api = '&apikey=7342635e';
    const m = await axios.get(url + imdb + api);

    // Here we append the detailed movie data
    const mybr = document.createElement('br');
    const mybr1 = document.createElement('br');
    const furtherSection = document.createElement('div');
    const plotP = document.createElement('p');
    const castP = document.createElement('p');
    const directorP = document.createElement('p');
    furtherSection.setAttribute('id', 'further');
    furtherSection.append(`Description: ${m.data.Plot}`, plotP);
    furtherSection.append(mybr);
    furtherSection.append(`Actors: ${m.data.Actors}`, castP);
    furtherSection.append(mybr1);
    furtherSection.append(`Director: ${m.data.Director}`, directorP);
    const section = document.getElementById(imdb);
    section.append(furtherSection);
  };

  // Use of .map to render each movie
  return (
    <div className="movieList">
      {Search.map((search) => (
        <div className="movie">
          <h4>{search.Title}</h4>
          <p>Year of Release - {search.Year}</p>
          <div className="movieImage" onMouseEnter={() => furtherMovieDetails(search)}>
            <img className="image" src={search.Poster} alt="Movie Poster" />
            <div className="imageOverlay imageOverlay--primary">
              <div id={search.imdbID} className="imageTitle" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
