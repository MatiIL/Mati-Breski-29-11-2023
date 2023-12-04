import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent
} from 'react';
import { AppDispatch } from '../../../state/store';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { fetchLocations, queryUpdated } from '../../../features/locationSearch/locationSlice';
import { fetchDailyForecasts, fetchDailyForecastsFulfilled } from '../../../features/dailyForecast/forecastSlice';
import { fetchCurrentWeather } from '../../../features/currentWeather/currentSlice';
import { Form, FloatingLabel } from 'react-bootstrap';


const SearchField: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.location.locations);
  const debounceTime = 300; // Adjust the debounce time as needed
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleTyping = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    try {
      const result = await dispatch(fetchLocations(inputValue));
      setDropdownVisible(true);
    } catch (error) {
      console.error('fetchLocations rejected:', error);
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement>, 
    key: string,
    name: string
    ) => {
    await dispatch(fetchCurrentWeather({ locationId: key, name }));
    await dispatch(fetchDailyForecasts(key));
    setDropdownVisible(false);
    dispatch({ type: 'location/resetSearchState' });
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

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
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTyping(e)}
          />
        </FloatingLabel>
      </Form>
      {isDropdownVisible && (
        <div>
          <ul
            ref={dropdownRef}
            className={`list-group list-group-flush ${isDropdownVisible ? 'visible' : ''}`}
            >
            {searchResults.length && searchResults.map((location) => (
              <a
                href="#"
                key={location.Key}
                className='list-group-item list-group-item-action'
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleClick(e, location.Key, location.LocalizedName)}
              >
                {location.LocalizedName}, {location.Country.LocalizedName}
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchField;