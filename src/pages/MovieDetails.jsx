import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css";
import { getMovieDetails, getMovieCredits } from "../services/api";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    useEffect(() => {
        const loadMovieDetails = async () => {
            setLoading(true);
            try {
                const movieData = await getMovieDetails(id);
                setMovie(movieData);

                const creditsData = await getMovieCredits(id);
                setCast(creditsData.cast.slice(0, 10)); // Get top 10 cast members
            } catch (err) {
                console.error(err);
                setError("Failed to load movie details...");
            } finally {
                setLoading(false);
            }
        };

        loadMovieDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        if (isFavorite(Number(id))) {
            removeFromFavorites(Number(id));
        } else {
            addToFavorites(movie);
        }
    };

    if (loading) return <div className="loading-container">Loading...</div>;
    if (error) return <div className="error-container">{error}</div>;
    if (!movie) return <div className="error-container">Movie not found</div>;

    const favorite = isFavorite(Number(id));

    return (
        <div className="movie-details">
            <div className="movie-details-header">
                <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
                    <div className="backdrop-overlay">
                        <div className="movie-details-content">
                            <div className="poster-container">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                            </div>
                            <div className="movie-info-container">
                                <h1>{movie.title} <span className="release-year">({movie.release_date?.split("-")[0]})</span></h1>
                                <div className="movie-meta">
                                    <span className="rating">{Math.round(movie.vote_average * 10) / 10}</span>
                                    <span className="runtime">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                                    <button
                                        className={`favorite-btn-details ${favorite ? "active" : ""}`}
                                        onClick={handleFavoriteClick}
                                    >
                                        {favorite ? "♥ Favorited" : "♡ Add to Favorites"}
                                    </button>
                                </div>
                                <div className="genres">
                                    {movie.genres?.map(genre => (
                                        <span key={genre.id} className="genre">{genre.name}</span>
                                    ))}
                                </div>
                                <div className="tagline">{movie.tagline}</div>
                                <div className="overview">
                                    <h3>Overview</h3>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="movie-details-body">
                <div className="cast-section">
                    <h2>Top Cast</h2>
                    <div className="cast-list">
                        {cast.map(person => (
                            <div key={person.id} className="cast-member">
                                {person.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
                                        alt={person.name}
                                        className="cast-photo"
                                    />
                                ) : (
                                    <div className="cast-photo placeholder">No Image</div>
                                )}
                                <div className="cast-info">
                                    <div className="cast-name">{person.name}</div>
                                    <div className="cast-character">{person.character}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="movie-additional-info">
                    <div className="info-item">
                        <span className="info-label">Status:</span>
                        <span className="info-value">{movie.status}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Budget:</span>
                        <span className="info-value">
                            {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                        </span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Revenue:</span>
                        <span className="info-value">
                            {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="back-link">
                <Link to="/">← Back to Movies</Link>
            </div>
        </div>
    );
}

export default MovieDetails;