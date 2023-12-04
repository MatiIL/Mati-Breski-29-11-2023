import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherData from '../weatherTypes';
import { convertToCelsius } from '../../utils';
import { Card } from 'react-bootstrap';
import { weatherIconMapping } from '../weatherIconMapping';
import { AppDispatch } from '../../state/store';
import { useAppDispatch } from '../../state/hooks';
import { setCurrentWeather } from '../../features/currentWeather/currentSlice';
import { fetchDailyForecasts } from '../../features/dailyForecast/forecastSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WeatherCardProps {
    data: WeatherData;
    name?: string;
    id?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, name, id }) => {
    const location = useLocation();
    const onFavoritesPage = location.pathname.includes('/favorites');
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const getDayAbbreviation = (data: number): string => {
        const date = new Date(data);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const abbreviatedDay = dayOfWeek.slice(0, 3);
        return abbreviatedDay;
    };

    const handleClick = async (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string | undefined,
        name: string | undefined,
        temp: number,
        icon: number,
        weatherText: string
    ) => {
        if (id !== undefined && name !== undefined) {
            try {
                dispatch(
                    setCurrentWeather({
                        id,
                        name,
                        weatherText,
                        weatherIcon: icon,
                        temparature: temp,
                    }));
                await dispatch(fetchDailyForecasts(id));
                navigate('/');
            } catch (error) {
                console.error('Failed to handle click:', error);
                toast.error('Daily forecast is currently unavailable on the weather API.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    toastId: 'failedHandleClick',
                });
            }
        }
    };

    return (
        <>
            <ToastContainer />
            {onFavoritesPage ? (
                <Card onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleClick(e, id, name, data.temparature, data.weatherIcon, data.weatherText)}
                >
                    <Card.Body>
                        <Card.Text>
                            {name}
                        </Card.Text>
                        {convertToCelsius(data.temparature)}&deg;c
                    </Card.Body>
                    <Card.Img
                        variant="bottom"
                        src={weatherIconMapping[data.weatherIcon]}
                        alt={data.weatherText}
                    />
                </Card>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Text>
                            {data.timestamp && getDayAbbreviation(data.timestamp)}
                        </Card.Text>
                        {convertToCelsius(data.temparature)}&deg;c
                    </Card.Body>
                    <Card.Img
                        variant="bottom"
                        src={weatherIconMapping[data.weatherIcon]}
                        alt={data.weatherText}
                    />
                </Card>
            )}
        </>
    );

}

export default WeatherCard;