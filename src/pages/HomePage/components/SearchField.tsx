import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { fetchLocations, queryUpdated } from '../../../features/locationSearch/locationSlice';
import { Form, FloatingLabel } from 'react-bootstrap';

const SearchField: React.FC = () => {
  const [location, setLocation] = useState("");
  const dispatch = useAppDispatch();
  // const searchResults = useAppSelector((state) => state.location.locations);
  const debounceTime = 300; // Adjust the debounce time as needed

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocation(inputValue);

    // Debounce the dispatch by delaying it for a specific time
    setTimeout(() => {
      dispatch(queryUpdated(inputValue));
    }, debounceTime);
  };



    return (
        <div>
        <Form className=''>
            <FloatingLabel
                controlId="floatingInput"
                label="type desired location"
                className=""
            >
                <Form.Control
                    type="search"
                    placeholder='type desired location'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleTyping(e)}
                />
            </FloatingLabel>
        </Form>
        {/* <div>
        <ul>
          {searchResults.map((location) => (
            <li key={location.Key}>
              {location.LocalizedName}, {location.Country.LocalizedName}
            </li>
          ))}
        </ul>
      </div> */}
      </div>
    )
}

export default SearchField;