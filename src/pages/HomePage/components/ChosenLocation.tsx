import React, { useEffect } from 'react';
import {
    Card,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useAppSelector } from '../../../state/hooks';
import CurrentWeatherHeader from './CurrentWeatherHeader';
import WeatherCard from './WeatherCard';


const ChosenLocation: React.FC = () => {
    const dailyForecasts = useAppSelector((state) => state.forecast.dailyForecasts);
    const currentWeather = useAppSelector((state) => state.currentWeather.weatherText);

    // useEffect(() => {
    //     console.log(dailyForecasts)
    // }, [dailyForecasts])

    return (
        currentWeather && dailyForecasts ? (
            <div className="align-self-center w-75 mt-3">
                <Card className="text-center">
                    <Card.Header>
                        <CurrentWeatherHeader />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title
                            className='fs-3 m-5'
                        >{currentWeather}</Card.Title>
                        <Container>
                            <Row>
                                {dailyForecasts.length && dailyForecasts.map((day) => (
                                    <Col 
                                    className='daily-weather m-2' 
                                    key={day.timestamp}
                                    sm={true}
                                    >
                                        <WeatherCard dailyData={day} />
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