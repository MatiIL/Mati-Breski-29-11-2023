import React from 'react';
import SearchField from './components/SearchField';
import ChosenLocation from './components/ChosenLocation';
import './HomePage.css';

const Homepage: React.FC = () => {

    return (
        <div className='wrapper d-flex flex-column align-items-center'>
            <SearchField/>
            <ChosenLocation/>
        </div>
    )
}

export default Homepage;