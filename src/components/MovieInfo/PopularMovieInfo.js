import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import "./MovieInfo.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const API_KEY="b32581e6";
// https://www.omdbapi.com/?i={MOVIE_ID}&apikey={API_KEY}
function MovieInfo(props) {
  
  const [Info,setInfo]=useState([]);
  const {selectedMovie}=props;

  useEffect(()=>{axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
  .then((response)=>{setInfo(response.data)});
  },[selectedMovie]);

  console.log(Info)
  return (
    <Container>
      {Info?<>
        <img className='CoverImage' src={Info?.Poster} />

          <div className='InfoColumn'>
          <span className='MovieName'>
              {Info?.Type} : <span>{Info?.Title}</span>
            </span>
            <span className="MovieInfoC">
              IMDB Rating: <span>{Info?.imdbRating}</span>
            </span>
            <span className="MovieInfoC">
              Year: <span>{Info?.Year}</span>
            </span>
            <span className="MovieInfoC">
              Language: <span>{Info?.Language}</span>
            </span>
            <span className="MovieInfoC">
              Rated: <span>{Info?.Rated}</span>
            </span>
            <span className="MovieInfoC">
              Released: <span>{Info?.Released}</span>
            </span>
            <span className="MovieInfoC">
              Runtime: <span>{Info?.Runtime}</span>
            </span>
            <span className="MovieInfoC">
              Genre: <span>{Info?.Genre}</span>
            </span>
            <span className="MovieInfoC">
              Director: <span>{Info?.Director}</span>
            </span>
            <span className="MovieInfoC">
              Actors: <span>{Info?.Actors}</span>
            </span>
            <span className="MovieInfoC">
              Plot: <span>{Info?.Plot}</span>
            </span>

          </div>
          <span className='Close' onClick={()=>props.onMovieSelect()}>X</span>
      </>:"Loading.."}
     
    </Container>
  )
}

export default MovieInfo