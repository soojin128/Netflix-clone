import axios from '../data/axios';
import React, { useEffect, useState } from 'react';
import '../styles/Banner.css';
import requests from '../data/Requests';

function Banner() {
  const [movie, setMovie] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length -1)
        ]
      );
      return request;
    }
    fetchData();
  },[]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n -1) + '...' : string;
  }
  return (
    <header className="banner__wrapper">
      <img src={`${base_url}${movie?.backdrop_path}`} alt={movie?.name} />
    
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">재생</button>
          <button className="banner__button">상세정보</button>
        </div>
        <h3 className="banner__description">
          {truncate(movie?.overview,150)}
          </h3>
      </div>
    </header>
  )
}

export default Banner
