import React, { useEffect } from 'react';
import { useFavoritesContext } from '../../../context/FavoritesContext';
import { useTempUnitContext } from '../../../context/TempUnitContext';
import { useAppSelector } from '../../../state/hooks';
import { convertToCelsius } from '../../../utils';
import { weatherIconMapping } from '../../../common/weatherIconMapping';
import { Button } from 'react-bootstrap';

const CurrentWeatherHeader: React.FC = () => {
    const weatherDetails = useAppSelector((state) => state.currentWeather);
    const {
        isLocationInFavorites,
        addToFavorites,
        removeFromFavorites
    } = useFavoritesContext();
    const { isFahrenheit } = useTempUnitContext();

    const handleClick = () => {
        if (!isLocationInFavorites(weatherDetails.id)) {
            addToFavorites({ id: weatherDetails.id, name: weatherDetails.name });
        } else {
            removeFromFavorites(weatherDetails.id);
        }
    }

    useEffect(() => {
        console.log('changed temparature unit');
    }, [isFahrenheit])

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
                    {isLocationInFavorites(weatherDetails.id) ? '♥' : '♡'}
                </Button>
                <div className='fav-btn mt-2'>
                    {isLocationInFavorites(weatherDetails.id) ? 'remove from favorites' : 'add to favorites'}
                </div>
            </div>

        </div>
    );
}

export default CurrentWeatherHeader;