import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent
} from 'react';
import { useUserGestureContext } from '../../../context/UserGestureContext';
import { AppDispatch } from '../../../state/store';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { fetchLocations } from '../../../features/locationSearch/locationSlice';
import { fetchDailyForecasts } from '../../../features/dailyForecast/forecastSlice';
import { fetchCurrentWeather } from '../../../features/currentWeather/currentSlice';
import { debounce } from '../../../utils';
import { Form, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchField: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.location.locations);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { setUserGesture } = useUserGestureContext();

  const debouncedFetchLocations = useRef(
    debounce(async (value: string) => {
      try {
        await dispatch(fetchLocations(value));
        setDropdownVisible(true);
      } catch (error) {
        console.error('fetchLocations rejected:', error);
        toast.error('Sorry, something gone wrong with the weather API.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          toastId: 'failedAutocomplete',
        });
      }
    }, 1000)
  ).current;

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
      debouncedFetchLocations(enteredValue);
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    key: string,
    name: string,
    country: string,
  ) => {
    const clickedLocation = `${name}, ${country}`
    setInputValue(clickedLocation);
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
      setInputValue('');
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
            onClick={() => setUserGesture(true)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTyping(e)}
          />
          <ToastContainer />
        </FloatingLabel>
      </Form>
      {isDropdownVisible && (
        <div>
          <ul
            ref={dropdownRef}
            className={
              `list-group list-group-flush 
              ${isDropdownVisible &&
                searchResults.length > 0 &&
                dropdownRef.current !== null ?
                'visible' : 'd-none'}`
            }
          >
            {searchResults.length && searchResults.map((location) => (
              <a
                href="#"
                key={location.Key}
                className='list-group-item list-group-item-action'
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleClick(e, location.Key, location.LocalizedName, location.Country.LocalizedName)}
              >
                {
                  location.LocalizedName !== "" ? location.LocalizedName : ""
                }, {
                  location.Country.LocalizedName !== "" ? location.Country.LocalizedName : ""
                }
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchField;