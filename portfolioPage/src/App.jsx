import React from 'react';
import Header from "./components/Header/Header";
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import MovieList from './components/MovieList/MovieList';
import MoviePage from './components/MoviePage/MoviePage';


function App() {
  return (
    <div>
      <Header />
      <MoviePage />
    </div>
  );
}

export default App;