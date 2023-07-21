import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent/MovieComponent";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import MovieInfo from "./components/MovieInfo/MovieInfo";

const API_KEY = "b32581e6";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 100px;
  height: 70px;
  margin: 5px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  width: 25%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchTitle, updateSearchTitle] = useState();
  const [searchGenre, updateSearchGenre] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString, searchGenre) => {

    if(!searchString && searchGenre){
      alert("Please enter a movie title")
      return
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

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/images/redLogo.png" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/images/search-icon.svg"></SearchIcon>
          <SearchInput
            type="text"
            placeholder="Movie Title"
            onChange={onChangeTitle}
            value={searchTitle}
          />
          {/* <button >click</button> */}
          <SearchInput
            type="text"
            placeholder="Genre (Optional)"
            onChange={onChangeGenre}
            value={searchGenre}
          />
          {/* <button >click</button> */}
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfo
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length
          ? movieList?.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : "No Movie Search"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
