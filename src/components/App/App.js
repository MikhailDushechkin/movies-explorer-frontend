import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import MainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { MOVIES_BASE_URL } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [queryError, setQueryError] = React.useState(false);

  const navigate = useNavigate();

  async function handleRegister(name, email, password) {
    setIsLoading(true);
    setInfoPopupOpen(true);
    try {
      const user = await MainApi.register(name, email, password);
      if (user) {
        handleLogin(email, password);
        setIsSuccess(true);
        setTimeout(() => setInfoPopupOpen(false), 1000);
        setTimeout(() => navigate('/movies', { replace: true }), 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(email, password) {
    setIsLoading(true);
    setInfoPopupOpen(true);
    try {
      const user = await MainApi.login(email, password);
      if (user) {
        setLoggedIn(true);
        setIsSuccess(true);
        setTimeout(() => setInfoPopupOpen(false), 1000);
        setTimeout(() => navigate('/movies', { replace: true }), 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoginCheck = React.useCallback(async () => {
    try {
      const user = await MainApi.getUserInfo();
      if (user) {
        setLoggedIn(true);
        setCurrentUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function handleGetMovies() {
    setIsLoading(true);
    try {
      const movies = await moviesApi.getMovies();
      if (movies) {
        return movies;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveMovie(movie) {
    try {
      const movieSave = await MainApi.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_BASE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieSave) {
        setSavedMovies([movieSave, ...savedMovies]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleGetSavedMovies = React.useCallback(async () => {
    try {
      const movies = await MainApi.getSavedMovies();
      if (movies) {
        setSavedMovies(movies);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    try {
      const data = await MainApi.deleteMovie(savedMovie._id);
      if (data) {
        setSavedMovies((state) =>
          state.filter((movie) => movie._id !== savedMovie._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const closeAllPopups = () => {
    setInfoPopupOpen(false);
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    handleLoginCheck();
  }, [loggedIn, handleLoginCheck]);

  React.useEffect(() => {
    if (loggedIn) {
      handleGetSavedMovies();
    }
  }, [loggedIn, handleGetSavedMovies]);

  // функция выхода и очистки
  async function signOut() {
    try {
      const logout = await MainApi.logout();
      if (logout) {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        setIsLoading(false);
        closeAllPopups();
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }}
    >
      <Routes>
        <Route
          exact
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/signin" />
            ) : (
              <Register handleRegister={handleRegister} isLoading={isLoading} />
            )
          }
        />
        <Route
          exact
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/movies" />
            ) : (
              <Login handleLogin={handleLogin} isLoading={isLoading} />
            )
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <Header
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <Movies
                isLoading={isLoading}
                savedMovies={savedMovies}
                onSearch={handleGetMovies}
                onMovieSave={handleSaveMovie}
                onMovieDelete={handleDeleteMovie}
                setQueryError={setQueryError}
                queryError={queryError}
              />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <SavedMovies
                savedMovies={savedMovies}
                onMovieDelete={handleDeleteMovie}
                setQueryError={setQueryError}
              />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <Profile
                isLogout={signOut}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        name={'info'}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
