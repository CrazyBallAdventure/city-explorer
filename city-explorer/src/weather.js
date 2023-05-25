import React from 'react';
import { Card, Table } from 'react-bootstrap';

const WeatherDay = ({ date, description }) => {
    return (
        <tr>
            <td>{date}</td>
            <td>{description}</td>
        </tr>
    );
};

const Weather = ({ weather }) => {
    return (
        <div className="weather-container">
            <h2>Weather Forecast</h2>
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weather.map((element, index) => (
                                <WeatherDay
                                    key={index}
                                    date={element.date}
                                    description={element.description}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Weather;