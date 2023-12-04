import React from 'react';
import { UserGestureProvider } from '../../context/UserGestureContext';
import SearchField from './components/SearchField';
import ChosenLocation from './components/ChosenLocation';
import './HomePage.css';

const Homepage: React.FC = () => {

    return (
        <UserGestureProvider>
            <div className='wrapper d-flex flex-column  align-items-center'>
                <SearchField />
                <ChosenLocation />
            </div>
        </UserGestureProvider>

    )
}

export default Homepage;