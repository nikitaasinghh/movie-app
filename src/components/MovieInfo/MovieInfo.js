import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfoC = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const API_KEY="b32581e6";
// https://www.omdbapi.com/?i={MOVIE_ID}&apikey={API_KEY}
function MovieInfo(props) {
  const [Info,setInfo]=useState([]);
  // const [data, setData] = useState([]);
  const {selectedMovie}=props;
  useEffect(()=>{axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
  .then((response)=>{setInfo(response.data)});
  },[selectedMovie]);

  console.log(Info)
  return (
    <Container>
      {Info?<>
        <CoverImage src={Info?.Poster} />

          <InfoColumn>
          <MovieName>
              {MovieInfoC?.Type}: <span>{Info?.Title}</span>
            </MovieName>
            <MovieInfoC>
              IMDB Rating: <span>{Info?.imdbRating}</span>
            </MovieInfoC>
            <MovieInfoC>
              Year: <span>{Info?.Year}</span>
            </MovieInfoC>
            <MovieInfoC>
              Language: <span>{Info?.Language}</span>
            </MovieInfoC>
            <MovieInfoC>
              Rated: <span>{Info?.Rated}</span>
            </MovieInfoC>
            <MovieInfoC>
              Released: <span>{Info?.Released}</span>
            </MovieInfoC>
            <MovieInfoC>
              Runtime: <span>{Info?.Runtime}</span>
            </MovieInfoC>
            <MovieInfoC>
              Genre: <span>{Info?.Genre}</span>
            </MovieInfoC>
            <MovieInfoC>
              Director: <span>{Info?.Director}</span>
            </MovieInfoC>
            <MovieInfoC>
              Actors: <span>{Info?.Actors}</span>
            </MovieInfoC>
            <MovieInfoC>
              Plot: <span>{Info?.Plot}</span>
            </MovieInfoC>

          </InfoColumn>
          <Close onClick={()=>props.onMovieSelect()}>X</Close>
      </>:"Loading.."}
     
    </Container>
  )
}

export default MovieInfo