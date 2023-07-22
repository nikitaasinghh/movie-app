import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent/MovieComponent";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import PopularMovie from "./components/MovieComponent/PopularMovie";

const API_KEY = "b32581e6";


function App() {
  const [searchTitle, updateSearchTitle] = useState();
  const [searchGenre, updateSearchGenre] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [popularMovie, setPopularMovie] = useState([]);
 
  const fetchPopular = async (searchString) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );
    setPopularMovie(response.data.Search);
  };

  const fetchData = async (searchString, searchGenre) => {

    if(!searchString && searchGenre){
      alert("Please enter a movie title")
      return
    }
    if(!searchString && !searchGenre){
      updateMovieList([]);
      onMovieSelect();
    }



    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    )

      console.log(response?.data?.Response)

    if(response?.data?.Response === "False"){
      if(searchGenre) alert("Search String too short")
      return
    }
      

    const responseArray = await response?.data;

    const responseArraySearch = await responseArray?.Search;
    
    const movieIds = await responseArraySearch?.map((movie) => movie.imdbID);
    const movieDataRequests = await movieIds.map((id) =>
      axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    );
    const movieDataResponses = await Promise.all(movieDataRequests);
    const movieData = await movieDataResponses?.map((response) => response.data);

    let filteredMovieData = movieData

    if(searchGenre && searchGenre.length>1){
    filteredMovieData = await movieData?.filter((movie) =>
      movie.Genre.split(", ").includes(
        searchGenre.charAt(0).toUpperCase() + searchGenre.slice(1)
      )
    );
      }
    console.log(filteredMovieData);

    updateMovieList(filteredMovieData);
  };

  const onChangeTitle = (event) => {
    clearTimeout(timeoutId);
    const s = event.target.value;
    updateSearchTitle(s);
    console.log(searchTitle);
    const timeout = setTimeout(() => fetchData(s, searchGenre), 1000);
    updateTimeoutId(timeout);
  };

  const onChangeGenre = (event) => {
    clearTimeout(timeoutId);
    const g = event.target.value;
    updateSearchGenre(g);
    console.log(searchGenre);
    const timeout = setTimeout(() => fetchData(searchTitle, g), 1500);
    updateTimeoutId(timeout);
  };

  const onClick=()=>{
    updateMovieList([]);
    updateSearchTitle("");
    updateSearchGenre("");
    onMovieSelect();
  }
  return (
    <div className="Container">
      <div className="Header">
        <div className="AppName" onClick={onClick}>
          <img className="MovieImage" src="/images/redLogo.png" />
          NikitaFlix
        </div>

        <div className="SearchBox">
          <img className="SearchIcon" src="/images/search-icon.svg"></img>
          <div className="SearchBar">

          <input className="SearchInput"
            type="text"
            placeholder="Movie Title"
            onChange={onChangeTitle}
            value={searchTitle}
          />
          {/* <button >click</button> */}
          <input className="SearchInputGenre"
            type="text"
            placeholder="Genre (Optional)"
            onChange={onChangeGenre}
            value={searchGenre}
          />
          {/* <button >click</button> */}
          </div>
        </div>
      </div>
      {selectedMovie && (
        <MovieInfo
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <div className="MovieListContainer">
        {movieList?.length
          ? movieList?.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : 
          <PopularMovie setPopularMovie={setPopularMovie} popularMovie={popularMovie} movieList={movieList}/>
        // "No Movie Search"
        }
      </div>
    </div>
  );
}

export default App;
