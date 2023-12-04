import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TempUnitProvider } from './context/TempUnitContext';
import { FavoritesContextProvider } from './context/FavoritesContext';
import { UserGestureProvider} from './context/UserGestureContext';
import HomePage from './pages/HomePage/Homepage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import HeaderComponent from './common/HeaderComponent/HeaderComponent';

const App: React.FC = () => {

  return (
    <UserGestureProvider>
      <TempUnitProvider>
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
      </TempUnitProvider>
    </UserGestureProvider>
  );
};

export default App;
