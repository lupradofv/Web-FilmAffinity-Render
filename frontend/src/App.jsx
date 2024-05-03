import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import './app.css';


function App() {
    const [movies, setMovies] = useState([]);

    const initialMovies = [
        { id: 1, title: 'Titanic', genre: 'Romance', description: 'Una historia de amor en el trágico viaje inaugural del RMS Titanic.' },
        { id: 2, title: 'Jurassic Park', genre: 'Ciencia ficción', description: 'Un parque temático de dinosaurios creado a través de la clonación de ADN.' }
    ];

    const fetchMovies = () => {
        setTimeout(() => {
            setMovies(initialMovies);
        }, 1000); 
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h2>Explorar Películas</h2>
                <MovieList movies={movies} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
