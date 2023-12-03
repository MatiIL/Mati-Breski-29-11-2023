import React, { useState, useEffect } from 'react';
import { useLocationDetails } from '../../../context/LocationNameContext';
import { RootState } from '../../../state/store';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { 
    addToFavorites, 
    removeFromFavorites, 
    isLocationInFavorites,
    selectFavorites, 
} from '../../../features/favoriteLocations/favortiesSlice';
import { Stack, Button } from 'react-bootstrap';
import { convertToCelsius } from '../../../utils';
import { weatherIconMapping } from '../../../common/weatherIconMapping';

const CurrentWeatherHeader: React.FC = () => {
    const weatherDetails = useAppSelector((state) => state.currentWeather);
    const { locationDetails } = useLocationDetails();
    const locationName = locationDetails.name;
    const locationId = locationDetails.id;

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state: RootState) => state.favorites.locations);
    const isFavoriteLocation = useAppSelector(selectFavorites).locations.some((location) => location.id === locationId);

    const heartStyle = {
        fontSize: '24px',
        marginRight: '8px',
    };

    const handleClick = () => {
        if (!isFavoriteLocation) {
            dispatch(addToFavorites({ id: locationId, name: locationName }));
          } else {
            dispatch(removeFromFavorites(locationId));
          }
    }

    useEffect(() => {
        console.log(favorites)

    }, [handleClick])

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="d-flex justify-content-between"
        >
            <div className="p-2 d-flex">
                <div>
                    <img
                        src={weatherIconMapping[weatherDetails.weatherIcon]}
                        alt={weatherDetails.weatherText}
                    />
                </div>
                <div
                    className='location-details d-flex flex-column align-items-start'>
                    <div>
                        {locationName}
                    </div>
                    <div>
                        {convertToCelsius(weatherDetails.temparature)}&deg;c
                    </div>
                </div>
            </div>
            <div className="p-2 d-flex">
                <span style={heartStyle}>
                    {isFavoriteLocation ? '♥' : '♡'}
                </span>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className=""
                    onClick={handleClick}
                >
                    Add to Favorites
                </Button>
            </div>
        </Stack>
    );
}

export default CurrentWeatherHeader;