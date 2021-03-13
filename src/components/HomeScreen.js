import React from 'react';
import '../styles/HomeScreen.css';
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from '../data/Requests';

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row 
      title='Netflix 오리지널'
      fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title='지금 뜨는 콘텐츠' fetchUrl={requests.fetchTrending}/>
      <Row title='평론가 호평! 영화' fetchUrl={requests.fetchTopRated}/>
      <Row title='액션' fetchUrl={requests.fetchActionMovies}/>
      <Row title='코미디' fetchUrl={requests.fetchComedyMovies}/>
      <Row title='호러' fetchUrl={requests.fetchHorrorMovies}/>
      <Row title='로맨스' fetchUrl={requests.fetchRomanceMovies}/>
      <Row title='다큐멘터리' fetchUrl={requests.fetchDocumentaries}/>
    </div>
  )
}

export default HomeScreen

