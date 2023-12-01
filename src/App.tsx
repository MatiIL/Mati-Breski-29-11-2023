import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from './context/DarkModeContext';
import Homepage from './pages/HomePage/Homepage';
import Favorites from './pages/FavoritesPage/Favorites';
import HeaderComponent from './common/HeaderComponent/HeaderComponent';

const App: React.FC = () => {

  return (
    <DarkModeProvider>
      <BrowserRouter>
      <HeaderComponent/>
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
      </DarkModeProvider>
  );
};

export default App;
