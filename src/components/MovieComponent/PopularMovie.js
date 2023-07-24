import React, { useEffect,useState } from 'react'
import axios from "axios";
import Popular from "./Popular.js";
import "./PopularMovie.css"
import { FiChevronsRight } from "react-icons/fi";

function PopularMovie(props) {
    const [popularMovie, setPopularMovie] = useState([]);
    const [page,setPage]=useState(1);

    const fetchData1 = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${i}`)
          .then((response)=>{setPopularMovie(response.data.results)});
    // props.setPopularMovie(response.data.results);
  };
  let i=1;
  const onClick=()=>{
    setPage(page+1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    // fetchData1();
  }

  const onClick1=()=>{
    if(page==1)
      return
    setPage(page-1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    // fetchData1();
  }
useEffect(()=>{axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`)
  .then((response)=>{setPopularMovie(response.data.results)});
  });
  // fetchData1();

//   console.log(props.Movies)
  return (
    <div>
      <h1 className='animate-charcter'>POPULAR MOVIE RECOMMENDATIONS</h1>
      <div className='Total'>

         {popularMovie?.length
          ? popularMovie?.map((movie, index) => (
              <Popular
                key={index}
                movie={movie}
                // onMovieSelect={onMovieSelect}
              />
            )): "No Movie Search"}
      </div>

            <button className='Close1' onClick={onClick1}>PREV</button>
            <button className='Close2' onClick={onClick}>NEXT</button>

    </div>
  )
}

export default PopularMovie