import React from 'react';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Form } from 'react-bootstrap';
import './HeaderComponent.css';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAppDispatch } from '../../state/hooks';
import { fetchCurrentWeatherForFavorites } from '../../features/favoriteLocations/favortiesSlice';

const HeaderComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useFavoritesContext();
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleFavoritesClick = async () => {
    const favoriteIds = favorites.map((location) => location.id);
    const favoriteNames = favorites.map((location) => location.name);
    await dispatch(fetchCurrentWeatherForFavorites({ ids: favoriteIds, names: favoriteNames }));
    navigate("/favorites");
  };
  
  return (
    <Navbar 
    className={darkMode? "bg-dark" : "bg-body-tertiary"}
    sticky='top'
    >
      <div className='d-flex ms-3'>
      <div className='d-flex flex-column'>
        <Link to="/" className='nav-link text-dark text-decoration-none'>
          <img
            alt="Icon by Rizki Ahmad Fauzi"
            src="../home-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <div className={darkMode? "light-navbar-item-text" : "navbar-item-text"}>Home</div>
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link 
        to="/favorites" 
        onClick={handleFavoritesClick}
        className='nav-link text-dark text-decoration-none ms-3'
        >
          <img
            alt="Icon by Rizki Ahmad Fauzi"
            src="../favs-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <div className={darkMode? "light-navbar-item-text" : "navbar-item-text"}>Favorites</div>
        </Link>
      </div>
      </div>
      <Form className='d-flex'>
        <div className='navbar-item-text me-3 mb-2 text-light'>
          light mode
        </div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="dark mode"
          className='navbar-item-text me-2'
          onChange={toggleDarkMode}
        />
      </Form>
    </Navbar>
  )
}

export default HeaderComponent;