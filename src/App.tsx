import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage';
import Favorites from './pages/FavoritesPage/Favorites';
import HeaderComponent from './common/HeaderComponent';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeChange = (isChecked: boolean) => {
    setIsDarkMode(isChecked);
  };

  return (
    <div 
    className="App"
    data-bs-theme={isDarkMode ? 'dark' : 'light'}
    >
      <BrowserRouter>
      <HeaderComponent onDarkModeChange={handleDarkModeChange}/>
      <Routes>
        <Route
        path='/'
        element={<Homepage/>}
        />
        <Route 
        path='/favorites'
        element={<Favorites/>}
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
