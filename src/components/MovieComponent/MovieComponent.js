import React from 'react'
import "./MovieComponent.css" 

function MovieComponent(props) {
    const {Title,Year,Rated,Released,Runtime,Genre,Director,Writer,Actors,Plot,Language,Country,Awards,Poster,Ratings,Metascore,imdbRating,imdbVotes,imdbID,Type,DVD,BoxOffice,Production,Website,Response}=props.movie;
  return (
    <div className="MovieContainer" onClick={()=>{
      props.onMovieSelect(imdbID);
      // window.scrollTo(0,0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }}>
        <img className="CoverImage" src={Poster}/>
        <span className="MovieName">{Title}</span>
        <div className="InfoColumn">
            <span className="MovieInfo">Year: {Year}</span>
            <span className="MovieInfo">Type: {Type}</span>
        </div>
    </div>
  )
}

export default MovieComponent