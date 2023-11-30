import React from 'react';
import SearchField from './components/SearchField';
import ChosenLocation from './components/ChosenLocation';
import './HomePage.css';

const Homepage: React.FC = () => {

    return (
        <div className='wrapper mt-4 d-flex flex-column justify-content-evenly align-items-center'>
            <SearchField/>
            <ChosenLocation />
        </div>
    )
}

export default Homepage;