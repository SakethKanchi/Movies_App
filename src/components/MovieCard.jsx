import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { Link } from "react-router-dom"

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavouriteClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className='movie-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <div className='movie-overlay'>
                        <button
                            className={`favorite-btn ${favorite ? "active" : ""}`}
                            onClick={onFavouriteClick}
                        >
                            ♥
                        </button>
                        <div className="movie-card-details">
                            {/* <span className="view-details">View Details</span> */}
                        </div>
                    </div>
                </div>
                <div className='movie-info'>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                    {movie.vote_average > 0 && (
                        <div className="movie-rating">
                            <span className="star">★</span> {Math.round(movie.vote_average * 10) / 10}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default MovieCard