import React from 'react';
import { Card, Table } from 'react-bootstrap';

const MovieItem = ({ title, overview, releaseDate }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{overview}</td>
            <td>{releaseDate}</td>
        </tr>
    );
};

const Movies = ({ movies }) => {
    console.log(movies);

    return (
        <div className="movie-container">
            <h2>Movie Forecast</h2>
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Overview</th>
                                <th>Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => (
                                <MovieItem
                                    key={index}
                                    title={movie.title}
                                    overview={movie.overview}
                                    releaseDate={movie.releaseDate}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Movies;
