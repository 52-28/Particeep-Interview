import React from 'react';
import { CategorieFilter } from '../Components/CategorieFilter/CategorieFilter';
import { MovieList } from '../Components/Movies/MovieList';
import { Pagination } from '../Components/Pagination/Pagination';
import { Title } from '../Components/Title/Title';

import './App.css';

function App() {
  return (
    <div className="App">
      <Title />
      <div className="App-Container">
        <CategorieFilter />
        <Pagination />
        <MovieList />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
