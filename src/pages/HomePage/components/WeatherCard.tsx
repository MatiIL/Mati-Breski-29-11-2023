import React from 'react';
import { DailyForecast } from '../../../features/dailyForecast/forecastSlice';
import { convertToCelsius } from '../../../utils';
import { Card } from 'react-bootstrap';
import { weatherIconMapping } from '../../../common/weatherIconMapping';

interface WeatherCardProps {
    dailyData: DailyForecast;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ dailyData }) => {

    const getDayAbbreviation = (data: number): string => {
        const date = new Date(data);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const abbreviatedDay = dayOfWeek.slice(0, 3);
        return abbreviatedDay;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    {getDayAbbreviation(dailyData.timestamp)}
                </Card.Text>
                {convertToCelsius(dailyData.maxTemp)}&deg;c
            </Card.Body>
            <Card.Img
                variant="bottom"
                src={weatherIconMapping[dailyData.Day.Icon]}
                alt={dailyData.Day.IconPhrase}
            />
        </Card>
    )
}

export default WeatherCard;