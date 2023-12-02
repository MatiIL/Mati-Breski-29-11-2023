import React, { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useAppSelector } from '../../../state/hooks';
import { convertToCelsius } from '../../../utils';
import { weatherIconMapping } from '../../../common/weatherIconMapping';

const CurrentWeatherHeader: React.FC = () => {
    const weatherDetails = useAppSelector((state) => state.currentWeather);
    const [like, setLike] = useState(false);

    const heartStyle = {
        fontSize: '24px',
        marginRight: '8px',
    };

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
                        Tel Aviv

                    </div>
                    <div>
                        {convertToCelsius(weatherDetails.temparature)}&deg;c
                    </div>
                </div>
            </div>
            <div className="p-2 d-flex">
                <span style={heartStyle}>
                    {like ? '♥' : '♡'}
                </span>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className=""
                    onClick={() => setLike((prevState) => !prevState)}
                >
                    Add to Favorites
                </Button>
            </div>
        </Stack>
    );
}
export default CurrentWeatherHeader;