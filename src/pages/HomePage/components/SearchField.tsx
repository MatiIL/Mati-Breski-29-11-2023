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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchField: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.location.locations);
  const debounceTime = 300; // Adjust the debounce time as needed
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleTyping = async (e: ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;
    const isEnglishInput = /^[a-zA-Z\s]*$/.test(enteredValue);

    if (!isEnglishInput) {
      setInputValue('');
      toast.error('Please use only English letters.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, 
        toastId: 'englishInputError',
      });
    } else {
      setInputValue(enteredValue);
      try {
        await dispatch(fetchLocations(inputValue));
        setDropdownVisible(true);
      } catch (error) {
        console.error('fetchLocations rejected:', error);
        toast.error('Sorry, something gone wrong with the weather API.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, 
          toastId: 'failedAutocomplete',
        });
      }
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    key: string,
    name: string
  ) => {
    try {
      await dispatch(fetchCurrentWeather({ locationId: key, name }));
    } catch (error) {
      console.error('Failed to fetch current weather:', error);
      toast.error(`Failed to fetch current weather for ${name}.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        toastId: 'failedCurrentWeatherLoad',
      });
    }
    try {
      await dispatch(fetchDailyForecasts(key));
    } catch (error) {
      console.error('Failed to fetch daily forecasts:', error);
      toast.error(`Failed to fetch daily forecasts for ${name}.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        toastId: 'failedDailyForecastsLoad',
      });
    }
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
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTyping(e)}
          />
          <ToastContainer />
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