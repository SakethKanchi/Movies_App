# 🎬 React Movie App

A sleek, responsive movie browsing application built with React and powered by The Movie Database (TMDB) API. This app allows users to discover popular movies, search for specific titles, view detailed information about each film, and maintain a personalized list of favorites.

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
  <div style="text-align: center;">
    <img src="./images/HomePage.png" width="400" />
    <br />
    <sub><b>Home Page</b></sub>
  </div>
  <div style="text-align: center;">
    <img src="./images/MovieDetailsPage.png" width="400" />
    <br />
    <sub><b>Movie Details Page</b></sub>
  </div>
  <div style="text-align: center;">
    <img src="./images/SearchPage.png" width="400" />
    <br />
    <sub><b>Search Page</b></sub>
  </div>
  <div style="text-align: center;">
    <img src="./images/FavoritesPage.png" width="400" />
    <br />
    <sub><b>Favorites Page</b></sub>
  </div>
</div>

## ✨ Features

- **Modern UI**: Clean, responsive design that works on desktop and mobile devices
- **Movie Discovery**: Browse popular movies with a visually appealing grid layout
- **Search Functionality**: Find specific movies with real-time search suggestions
- **Detailed Movie Information**: View comprehensive details including:
  - Movie synopsis, runtime, and release year
  - Genre classification
  - Budget and revenue information
  - User ratings
  - Top cast members with photos
- **Favorites System**: Add movies to your favorites list for quick access later
- **Persistent Storage**: Favorites are saved to localStorage and persist between sessions
- **Responsive Design**: Optimized for all screen sizes with adaptive layouts

## 🔧 Technologies Used

- **React**: UI building and component-based architecture
- **React Router**: Navigation and routing management
- **Context API**: State management for favorites and shared data
- **Local Storage**: Persistence of user favorites
- **CSS3**: Custom styling with responsive design principles
- **TMDB API**: External data source for movie information

## 📂 Project Structure

```
react-movie-app/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx    # Reusable movie card component
│   │   └── NavBar.jsx       # Navigation bar with search
│   ├── contexts/
│   │   └── MovieContext.jsx # Context for favorites management
│   ├── pages/
│   │   ├── Home.jsx         # Main movie browsing page
│   │   ├── Favorites.jsx    # User's favorite movies
│   │   └── MovieDetails.jsx # Detailed view of a single movie
│   ├── services/
│   │   └── api.js           # API service for TMDB integration
│   ├── css/                 # Styling for components and pages
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
```

## 🚀 Key Implementation Details

### Routing
The app uses React Router for navigation between different views:
- `/` - Home page displaying popular movies or search results
- `/favorites` - User's saved favorite movies
- `/movie/:id` - Detailed view for a specific movie

### State Management
- **Context API**: Provides a global state for favorite movies across the application
- **Local Storage**: Persists user favorites between sessions

### Search Functionality
- Real-time search suggestions with debounced API calls
- Direct navigation to search results via URL parameters
- Clean UI with dropdown suggestions

### Responsive Design
- Fluid grid layouts that adapt to different screen sizes
- Mobile-optimized navigation and card designs
- Consistent user experience across devices

## 📱 Responsive Breakpoints

The application is fully responsive with specific optimizations at the following breakpoints:

- **Mobile**: Up to 480px
- **Tablet**: 481px to 768px
- **Desktop**: 769px and above

## 🔑 API Integration

This project uses The Movie Database (TMDB) API. To run this project locally:

1. Get an API key from [TMDB](https://www.themoviedb.org/documentation/api)
2. Create a `.env` file in the project root with: `VITE_TMDB_API_KEY=your_api_key_here`

## 📦 How to Run

```bash
# Clone the repository
git clone https://github.com/yourusername/react-movie-app.git

# Navigate to the project directory
cd react-movie-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🌟 Future Enhancements

- User authentication system
- Custom user movie ratings
- Movie recommendations based on viewing history
- Advanced filtering options (by genre, year, rating)
- Trailer playback integration
- Dark/light theme toggle

---

This project was created with React and Vite. Designed and developed with ❤️ for movie enthusiasts.