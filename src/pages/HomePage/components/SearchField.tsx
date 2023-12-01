import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { fetchLocations, queryUpdated } from '../../../features/locationSearch/locationSlice';
import { fetchDailyForecasts, fetchDailyForecastsFulfilled } from '../../../features/dailyForecast/forecastSlice';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.location.locations);
  const debounceTime = 300; // Adjust the debounce time as needed

  const handleTyping = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(fetchLocations(inputValue)).then((result) => {
      console.log('fetchLocations fulfilled:', result);
    }).catch((error) => {
      console.error('fetchLocations rejected:', error);
    });
  }

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    await dispatch(fetchDailyForecasts(key));
    }
    
  return (
    <div>
      <Form className='w-75'>
        <FloatingLabel
          controlId="floatingInput"
          label="type desired location"
        >
          <Form.Control
            type="search"
            placeholder='type desired location'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTyping(e)}
          />
        </FloatingLabel>
      </Form>
      <div>
        <ul className='list-group list-group-flush'>
          {searchResults.length && searchResults.map((location) => (
            <a
            href="#"
            key={location.Key}
            className='list-group-item list-group-item-action'
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, location.Key)}
            >
              {location.LocalizedName}, {location.Country.LocalizedName}
            </a>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchField;