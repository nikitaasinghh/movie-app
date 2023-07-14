import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent/MovieComponent';
import { useState } from 'react'; 
import axios from 'axios';

const API_KEY="b32581e6";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header=styled.div`
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
margin-left: 20px;
width: 50%;
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
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [search,updateSearch]=useState();
  const [timeoutId,updateTimeoutId]=useState();
  const [movieList,updateMovieList]=useState([]);

  const fetchData= async (searchString)=>{
    const response=await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,);
    console.log(response);
    updateMovieList(response.data.Search);
  }

  const onChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearch(event.target.value);
    const timeout=setTimeout(()=>fetchData(search),500);
    updateTimeoutId(timeout);
  }


  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/images/redLogo.png" />
        React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/images/search-icon.svg"></SearchIcon>
          <SearchInput placeholder="Search a movie"
          onChange={onChange}
          value={search}/>
        </SearchBox>
      </Header>
      <MovieListContainer>
        {movieList?.length? movieList.map((movie,index)=>
          <MovieComponent key={index} movie={movie}/>
        ): "No Movie Search"
      }
      </MovieListContainer>
    </Container>
  );
}

export default App;
