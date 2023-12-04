import React, { useEffect } from 'react';
import { fetchCurrentWeather } from '../../../features/currentWeather/currentSlice';
import { fetchDailyForecasts } from '../../../features/dailyForecast/forecastSlice';
import {
    Card,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { AppDispatch } from '../../../state/store';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import CurrentWeatherHeader from './CurrentWeatherHeader';
import WeatherCard from '../../../common/WeatherCard/WeatherCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChosenLocation: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const dailyForecasts = useAppSelector((state) => state.forecast.dailyForecasts);
    const currentWeatherFromApi = useAppSelector((state) => state.currentWeather);
    const defaultLocation = 'Tel Aviv'
    const tlvKey = '215854';

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchCurrentWeather({ locationId: tlvKey, name: defaultLocation }));
            } catch (error) {
                console.error('Failed to fetch current weather:', error);
                toast.error(`Failed to fetch current weather for ${defaultLocation}.`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    toastId: 'failedCurrentWeatherLoad',
                });
            }
            try {
                await dispatch(fetchDailyForecasts(tlvKey));
            } catch (error) {
                console.error('Failed to fetch daily forecasts:', error);
                toast.error(`Failed to fetch daily forecasts for ${defaultLocation}.`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    toastId: 'failedDailyForecastsLoad',
                });
            }
        };

        if (!dailyForecasts.length) {
            fetchData();
        }
    }, [dispatch, tlvKey, dailyForecasts]);

    return (
        <>
            <ToastContainer />
            {currentWeatherFromApi && dailyForecasts.length ? (
                <div className="align-self-center w-75 mt-4">
                    <Card className="text-center">
                        <Card.Header>
                            <CurrentWeatherHeader />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title
                                className='fs-3 m-5'
                            >{currentWeatherFromApi.weatherText}</Card.Title>
                            <Container>
                                <Row>
                                    {dailyForecasts.length && dailyForecasts.map((day) => (
                                        <Col
                                            className='daily-weather m-2'
                                            key={day.timestamp}
                                            sm={true}
                                        >
                                            <WeatherCard data={day} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
            ) : <></>}
        </>
    );

}

export default ChosenLocation;