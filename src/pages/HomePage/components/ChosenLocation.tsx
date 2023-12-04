import React, { useEffect } from 'react';
import {
    Card,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useAppSelector } from '../../../state/hooks';
import CurrentWeatherHeader from './CurrentWeatherHeader';
import WeatherCard from '../../../common/WeatherCard/WeatherCard';

const ChosenLocation: React.FC = () => {
    const dailyForecasts = useAppSelector((state) => state.forecast.dailyForecasts);
    const currentWeatherFromApi = useAppSelector((state) => state.currentWeather);

    return (
        currentWeatherFromApi && dailyForecasts ? (
            <div className="align-self-center w-75 mt-4">
                <Card className="text-center">
                    <Card.Header>
                        <CurrentWeatherHeader/>
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

        ) : (<></>)
    )

}

export default ChosenLocation;