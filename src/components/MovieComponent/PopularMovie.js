import React, { useEffect,useState } from 'react'
import axios from "axios";
import Popular from "./Popular.js";

function PopularMovie(props) {
    const [popularMovie, setPopularMovie] = useState([]);

//     const fetchData1 = async () => {
//         const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
//     );
//     props.setPopularMovie(response.data);
//   };

useEffect(()=>{axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
  .then((response)=>{setPopularMovie(response.data)});
  });
//   console.log(props.Movies)
  return (
    <div>
         {popularMovie?.length
          ? popularMovie?.map((movie, index) => (
              <Popular
                key={index}
                movie={movie}
                // onMovieSelect={onMovieSelect}
              />
            )): "No Movie Search"}
    </div>
  )
}

export default PopularMovie