import MovieCard from "../components/MovieCard";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearchQuery = searchParams.get('search') || '';

    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load movies based on URL search param or popular movies
    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                let results;

                // If there's a search query in the URL, use that
                if (urlSearchQuery) {
                    results = await searchMovies(urlSearchQuery);
                    setSearchQuery(urlSearchQuery);
                } else {
                    results = await getPopularMovies();
                }

                setMovies(results);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [urlSearchQuery]); // Re-run when the URL search parameter changes

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        // Update the URL with the search query
        setSearchParams({ search: searchQuery });
    };

    return (
        <div className='home'>
            {/* <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form> */}

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    ) : (
                        <div className="no-results">No movies found. Try a different search term.</div>
                    )}
                </div>
            }
        </div>
    );
}

export default Home;