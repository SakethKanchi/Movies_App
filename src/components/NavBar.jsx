import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { useState, useEffect, useRef } from "react";
import { getSearchSuggestions } from "../services/api";

function NavBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    // Handle click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fetch suggestions when search query changes
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const results = await getSearchSuggestions(searchQuery);
                setSuggestions(results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (movieId) => {
        navigate(`/movie/${movieId}`);
        setSearchQuery("");
        setShowSuggestions(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>

            <div className="navbar-search">
                <form onSubmit={handleSearch}>
                    <div className="search-container" ref={inputRef}>
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            className="navbar-search-input"
                        />
                        <button type="submit" className="navbar-search-button">
                            🔍
                        </button>
                    </div>

                    {showSuggestions && searchQuery.trim().length > 0 && (
                        <div className="suggestions-container" ref={suggestionsRef}>
                            {loading ? (
                                <div className="suggestion-loading">Loading...</div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(movie.id)}
                                    >
                                        <span className="suggestion-title">{movie.title}</span>
                                        {movie.year && <span className="suggestion-year">({movie.year})</span>}
                                    </div>
                                ))
                            ) : (
                                <div className="no-suggestions">No results found</div>
                            )}
                        </div>
                    )}
                </form>
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;