import React from 'react';

export default function MovieList({ movies }) {
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p><strong>Género:</strong> {movie.genre}</p>
                    <p>{movie.description}</p>
                </li>
            ))}
        </ul>
    );
}

