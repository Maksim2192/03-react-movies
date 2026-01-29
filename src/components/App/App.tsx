import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2YxZWM1MTU4ZWJkNDI4ODNkYWQzOTEyY2IzM2UzNSIsIm5iZiI6MTc2OTY4MTY4NS4xODgsInN1YiI6IjY5N2IzMzE1YzRjYTY0YjRhN2E3ZWMyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ojZtBvEVmvE635JOQqdbVUFRF-4NUeaxpVSLjDHubD0'; // заміни на свій токен

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  
  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies({ query, page: 1 }, TOKEN);

      if (results.length === 0) {
        toast('No movies found for your request.');
      }

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error('Error fetching movies.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

 
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;