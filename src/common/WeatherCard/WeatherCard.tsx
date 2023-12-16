import React, { forwardRef, Ref } from 'react';
import { Card } from 'react-bootstrap';
import { useTempUnitContext } from '../../context/TempUnitContext';
import { weatherIconMapping } from '../weatherIconMapping';
import WeatherData from '../weatherTypes';
import { convertToCelsius } from '../../utils';

interface WeatherCardProps {
    data: WeatherData;
    cardTitle: string;
}

const WeatherCard: React.ForwardRefRenderFunction<HTMLDivElement, WeatherCardProps> = (
    { data, cardTitle }, ref: Ref<HTMLDivElement>
) => {
    const { isFahrenheit } = useTempUnitContext();

    return (
        <Card ref={ref}>
            <Card.Body>
                <Card.Text>
                    {cardTitle}
                </Card.Text>
                {isFahrenheit
                    ? `${data.temparature}°F`
                    : `${convertToCelsius(data.temparature)}°C`
                }
            </Card.Body>
            <Card.Img
                variant="bottom"
                src={weatherIconMapping[data.weatherIcon]}
                alt={data.weatherText}
            />
        </Card>
    );
};

export default forwardRef(WeatherCard);