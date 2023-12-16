import React from 'react';
import { useAppSelector } from '../../state/hooks';
import { useUserGestureContext } from '../../context/UserGestureContext';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../state/store';
import { useAppDispatch } from '../../state/hooks';
import { setCurrentWeather } from '../../features/currentWeather/currentSlice';
import { fetchDailyForecasts } from '../../features/dailyForecast/forecastSlice';
import WeatherCard from '../../common/WeatherCard/WeatherCard';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
    const favoriteLocationsWeather = useAppSelector((state) => state.favorites.locationsWeather);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { setUserGesture } = useUserGestureContext();

    const handleClick = async (
        e: React.MouseEvent<HTMLDivElement>,
        id: string | undefined,
        name: string | undefined,
        temp: number | undefined,
        icon: number | undefined,
        weatherText: string | undefined
    ) => {
        if (id !== undefined && name !== undefined) {
            setUserGesture(false);
            try {
                if (weatherText !== undefined &&
                    icon !== undefined &&
                    temp !== undefined)
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
        <div className='fav-wrapper d-flex flex-column align-items-center'>
            <h1 className='fs-4 mt-2'>
                Your Favorite Locations
            </h1>
            <Container className='mt-3'>
                <Row>
                    {favoriteLocationsWeather !== undefined &&
                        favoriteLocationsWeather.map((favorite) => (
                            <Col xxl={1} xl={2} lg={3} md={4} sm={3} xs={6}
                                className='mb-3'
                                key={favorite.id}>

                                {favorite.currentWeather !== undefined && (
                                    <>
                                        <ToastContainer />
                                        <div
                                            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                                                handleClick(e, favorite.id, favorite.name, favorite.currentWeather?.temparature, favorite.currentWeather?.weatherIcon, favorite.currentWeather?.weatherText)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <WeatherCard data={favorite.currentWeather} cardTitle={favorite.name} />
                                        </div>
                                    </>
                                )}
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    )
}

export default FavoritesPage;