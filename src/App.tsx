import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from './context/DarkModeContext';
import { LocationDetailsProvider } from './context/LocationNameContext';
import Homepage from './pages/HomePage/Homepage';
import Favorites from './pages/FavoritesPage/Favorites';
import HeaderComponent from './common/HeaderComponent/HeaderComponent';

const App: React.FC = () => {

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <HeaderComponent />
        <LocationDetailsProvider>
          <Routes>
            <Route
              path='/'
              element={<Homepage />}
            />
            <Route
              path='/favorites'
              element={<Favorites />}
            />
          </Routes>
        </LocationDetailsProvider>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
