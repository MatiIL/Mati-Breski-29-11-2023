import React from 'react';
import { useAppSelector } from '../../state/hooks';
import WeatherCard from '../../common/WeatherCard/WeatherCard';
import { Container, Row, Col } from 'react-bootstrap';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
    const favoritesWeatherData = useAppSelector((state) => state.favorites.locations);

    return (
        <div className='fav-wrapper d-flex flex-column align-items-center'>
            <h1 className='fs-4 mt-2'>
                Your Favorite Locations
                </h1>
            <Container className='mt-3'>
                <Row>
                    {favoritesWeatherData.map((favorite) => (
                        <Col xxl={1} xl={2} lg={3} md={4} sm={3} xs={6}
                        className='mb-3'
                        key={favorite.id}>
                            {favorite.currentWeather && (
                                <WeatherCard 
                                data={favorite.currentWeather} 
                                name={favorite.name}
                                id={favorite.id}
                                />
                            )}
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default FavoritesPage;