import React from 'react'
import "./MovieComponent.css" 

function PopularMovie(props) {
    // const {Title,Year,Rated,Released,Runtime,Genre,Director,Writer,Actors,Plot,Language,Country,Awards,Poster,Ratings,Metascore,imdbRating,imdbVotes,imdbID,Type,DVD,BoxOffice,Production,Website,Response}=props.movie;
  return (
    <>
        <img className="CoverImage" src={props.movie.poster_path}/>
        <span className="MovieName">{props.movie.title}</span>
        <div className="InfoColumn">
            <span className="MovieInfo">Rating: {props.movie.vote_average}</span>
            <span className="MovieInfo">Release: {props.movie.release_date}</span>
        </div>
    </>
  )
}

export default PopularMovie