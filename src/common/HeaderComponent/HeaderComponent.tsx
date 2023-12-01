import React from 'react';
import { Navbar, Form } from 'react-bootstrap';
import './HeaderComponent.css';
import { useDarkMode } from '../../context/DarkModeContext';

const HeaderComponent: React.FC = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Navbar 
    className={darkMode? "bg-dark" : "bg-body-tertiary"}
    // fixed="top"
    >
      <div className='d-flex justify-content-around ms-3'>
      <div className='d-flex flex-column'>
        <Navbar.Brand href="/">
          <img
            alt="Icon by Rizki Ahmad Fauzi"
            src="../home-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <div className={darkMode? "light-navbar-item-text" : "navbar-item-text"}>Home</div>
        </Navbar.Brand>
      </div>
      <div className='d-flex flex-column'>
        <Navbar.Brand href="/favorites">
          <img
            alt="Icon by Rizki Ahmad Fauzi"
            src="../favs-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <div className={darkMode? "light-navbar-item-text" : "navbar-item-text"}>Favorites</div>
        </Navbar.Brand>
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