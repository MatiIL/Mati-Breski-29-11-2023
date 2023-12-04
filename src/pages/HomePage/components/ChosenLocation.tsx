import React, { useEffect } from 'react';
import { fetchCurrentWeather } from '../../../features/currentWeather/currentSlice';
import { fetchDailyForecasts } from '../../../features/dailyForecast/forecastSlice';
import { fetchGeoposition } from '../../../features/geopositionSearch/geopositionSlice';
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
import { useUserGestureContext } from '../../../context/UserGestureContext';

const ChosenLocation: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const dailyForecasts = useAppSelector((state) => state.forecast.dailyForecasts);
    const currentWeatherFromApi = useAppSelector((state) => state.currentWeather);
    const locationDetails = useAppSelector((state) => state.geoposition.location);
    const { userGesture } = useUserGestureContext();

    useEffect(() => {
        if (userGesture) {
            const fetchLocationDetails = async () => {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    if (latitude && longitude) {
                        await dispatch(fetchGeoposition({ lat: latitude.toString(), lon: longitude.toString() }));
                    }
                });
            }
            fetchLocationDetails();
        }

    }, [userGesture, dispatch]);

    useEffect(() => {
        if (locationDetails) {
            const fetchUserLocationData = async () => {
                try {
                    await dispatch(fetchCurrentWeather({ locationId: locationDetails.id, name: locationDetails.name }));
                    await dispatch(fetchDailyForecasts(locationDetails.id));
                } catch (error) {
                    console.error('Failed to fetch current weather:', error);
                    toast.error(`Failed to fetch current weather for ${locationDetails.name}.`, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        toastId: 'failedCurrentWeatherLoad',
                    });
                }
            }
            fetchUserLocationData();
        }

    }, [locationDetails, dispatch])

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