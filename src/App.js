import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buttons from './components/Buttons';
import SearchBar from './components/SearchBar';

function App() {

  return (
    <div>
      <SearchBar />
      <Buttons />
    </div>
   
  );
}

export default App;
