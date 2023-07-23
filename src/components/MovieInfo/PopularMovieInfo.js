// import React from 'react'
// import "./PopularMovieInfo.css"

// function PopularMovieInfo(props) {
//   return (
//     <div>

//     <div className='full'> 
//        <img className="poster" src={`https://image.tmdb.org/t/p/original${props.movie?props.movie.poster_path:""}`} />

//       <div className='fullInfo'>
//         <span className='name'>
//           Title : <span>{props.movie.title}</span>
//         </span>
//         <span className="detail">
//           IMDB Rating: <span>{props.movie.vote_average}</span>
//         </span>
//         <span className="detail">
//           Released : <span>{props.movie.release_date}</span>
//         </span>
//         <span className="detail">
//           Language: <span>{props.movie.original_language}</span>
//         </span>
//         <span className="detail">
//           Votes: <span>{props.movie.vote_count}</span>
//         </span>
//         <span className="detail">
//           Popularity :  <span>{props.movie.popularity}</span>
//         </span>
//         <span className="detail">
//           Overview: <span>{props.movie.overview}</span>
//         </span>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default PopularMovieInfo