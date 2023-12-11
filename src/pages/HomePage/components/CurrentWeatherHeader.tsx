import React, { useEffect } from 'react';
import { useTempUnitContext } from '../../../context/TempUnitContext';
import { useAppSelector, useAppDispatch } from '../../../state/hooks';
import { convertToCelsius } from '../../../utils';
import { weatherIconMapping } from '../../../common/weatherIconMapping';
import { Button } from 'react-bootstrap';
import { addToFavorites, removeFromFavorites, isLocationInFavorites } from '../../../features/favoriteLocations/favortiesSlice';

const CurrentWeatherHeader: React.FC = () => {
    const weatherDetails = useAppSelector((state) => state.currentWeather);
    const favorites = useAppSelector((state) => state.favorites);
    const isFav = isLocationInFavorites(weatherDetails.id, favorites);

    const dispatch = useAppDispatch();
    const { isFahrenheit } = useTempUnitContext();

    const handleClick = () => {
        if (!isFav) {
            dispatch(addToFavorites({ id: weatherDetails.id, name: weatherDetails.name }));
        } else {
            dispatch(removeFromFavorites(weatherDetails.id));
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="p-2 d-flex align-items-center">
                <div>
                    <img
                        src={weatherIconMapping[weatherDetails.weatherIcon]}
                        alt={weatherDetails.weatherText}
                    />
                </div>
                <div className='location-details d-flex flex-column align-items-start ms-2'>
                    <div>{weatherDetails.name}</div>
                    {
                        weatherDetails.temparature !== null && weatherDetails.temparature !== undefined ? (
                            <div>
                                {isFahrenheit
                                    ? `${weatherDetails.temparature}°F`
                                    : `${convertToCelsius(weatherDetails.temparature)}°C`
                                }
                            </div>
                        ) : ("")
                    }
                </div>

            </div>

            <div>
                <Button
                    variant="outline-secondary"
                    className="position-sticky"
                    onClick={handleClick}
                >
                    {isFav ? '♥' : '♡'}
                </Button>
                <div className='fav-btn mt-2'>
                    {isFav ? 'remove from favorites' : 'add to favorites'}
                </div>
            </div>

        </div>
    );
}

export default CurrentWeatherHeader;