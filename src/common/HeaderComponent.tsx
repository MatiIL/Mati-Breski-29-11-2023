import React, { useState, ChangeEvent } from 'react';
import { Navbar, Form } from 'react-bootstrap';
import './HeaderComponent.css';

interface HeaderComponentProps {
  onDarkModeChange: (isChecked: boolean) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ onDarkModeChange }) => {
  const [isDarkModeChecked, setIsDarkModeChecked] = useState(false);

  const handleDarkModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsDarkModeChecked(isChecked);
    onDarkModeChange(isChecked);
  };

  return (
    <Navbar className="bg-body-tertiary">
      <div className='d-flex justify-content-around ms-2'>
      <div className='d-flex flex-column'>
        <Navbar.Brand href="/homepage">
          <img
            alt="Icon by Rizki Ahmad Fauzi"
            src="../home-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <div className="navbar-item-text">Home</div>
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
          <div className="navbar-item-text">Favorites</div>
        </Navbar.Brand>
      </div>
      </div>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="dark mode"
          className='navbar-item-text me-2'
          checked={isDarkModeChecked}
          onChange={handleDarkModeChange}
        />
      </Form>
    </Navbar>
  )
}

export default HeaderComponent;