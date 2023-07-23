import React, { useState } from 'react'
import "./Popular.css" 
import styled from "styled-components";
// import PopularMovieInfo from '../MovieInfo/PopularMovieInfo';

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function PopularMovie(props) {
    // const [select,setSelect]=useState(false);
    // const {Title,Year,Rated,Released,Runtime,Genre,Director,Writer,Actors,Plot,Language,Country,Awards,Poster,Ratings,Metascore,imdbRating,imdbVotes,imdbID,Type,DVD,BoxOffice,Production,Website,Response}=props.movie;
    // const onClick=()=>{
    //   setSelect(true);
    // }
    {/* {select && (
   <PopularMovieInfo movie={props.movie}/>
  )} */}
  {/* onClick={onClick} */}
  return (
    
    <div className="Outer" >
      <div className='second'>
        <img className="Image" src={`https://image.tmdb.org/t/p/original${props.movie?props.movie.poster_path:""}`} />
        <span className="MName">{props.movie.title}</span>
        <div className="Column">
            <span className="Info">Rating: {props.movie.vote_average}</span>
            <span className="Info">Release: {props.movie.release_date}</span>
        </div>
      </div>
    </div>
    

  )
}

export default PopularMovie