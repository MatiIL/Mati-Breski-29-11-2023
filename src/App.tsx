import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from './context/DarkModeContext';
import { FavoritesContextProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage/Homepage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import HeaderComponent from './common/HeaderComponent/HeaderComponent';

const App: React.FC = () => {

  return (
    <DarkModeProvider>
      <FavoritesContextProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/favorites'
              element={<FavoritesPage />}
            />
          </Routes>
        </BrowserRouter>
      </FavoritesContextProvider>
    </DarkModeProvider>
  );
};

export default App;
