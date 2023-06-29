import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import MainApi from '../../utils/MainApi';

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

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  async function handleRegister(name, email, password) {
    setIsLoading(true);
    setInfoPopupOpen(true);
    try {
      const userData = await MainApi.register(name, email, password);
      if (userData) {
        handleLogin(email, password);
        setIsSuccess(true);
        setTimeout(() => setInfoPopupOpen(false), 1000);
        setTimeout(() => navigate('/signin', { replace: true }), 1500);
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
      const userData = await MainApi.login(email, password);
      if (userData) {
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
      const userData = await MainApi.getUserInfo();
      if (userData) {
        setLoggedIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    handleLoginCheck();
  }, [loggedIn, handleLoginCheck]);

  // функция выхода и очистки
  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setIsLoading(false);
    closeAllPopups();
    navigate('/', { replace: true });
  };

  const closeAllPopups = () => {
    setInfoPopupOpen(false);
    setIsMenuOpen(false);
  };

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
              <Movies />
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
              <SavedMovies />
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
              <Profile isLogout={signOut} setIsLoading={setIsLoading} />
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
