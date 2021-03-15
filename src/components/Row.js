import axios from '../data/axios';
import React, { useEffect, useState } from 'react';
import '../styles/Row.css';

function Row({title, fetchUrl}) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  },[fetchUrl]);

  const [isLargeRow, setIsLargeRow] = useState(false);
  
  const changePoster = () => {
    if(window.innerWidth <= 425){
      setIsLargeRow(true);
    }else{
      setIsLargeRow(false);
    }
  }

  useEffect (() => {
    changePoster();
  },[]);

  window.addEventListener('resize',changePoster);

  return (
    <div className="row">
      <h3>{title}</h3>

      <div className="row__posters">
        {movies.map((movie) => (
          (isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <img 
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} 
            alt={movie.name} 
            />
            )
        )}
      </div>
    </div>
  )
}

export default Row;
