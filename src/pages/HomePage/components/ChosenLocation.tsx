import React, { useEffect } from 'react';
import {
    Card,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useAppSelector } from '../../../state/hooks';


const ChosenLocation: React.FC = () => {
    const dailyForecasts = useAppSelector((state) => state.forecast.dailyForecasts);
    const headlineText = useAppSelector((state) => state.forecast.headline);

    useEffect(() => {
        console.log(dailyForecasts, headlineText)
    }, [dailyForecasts, headlineText])

    return (
        <div className="align-self-center w-75">
            <Card className="text-center">
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>Cloudy</Card.Title>
                    <Container>
                        <Row>
                            <Col>Sun</Col>
                            <Col>Mon</Col>
                            <Col>Tue</Col>
                            <Col>Wed</Col>
                            <Col>Thu</Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ChosenLocation;