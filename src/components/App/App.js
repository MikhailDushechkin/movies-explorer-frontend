import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

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
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  // функция для регистрации
  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        setInfoTooltipPopupOpen(true);
        setIsSuccess(true);
      })
      .then((res) => navigate('/signin', { replace: true }))
      .catch((err) => {
        console.log(err);
        setInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // функция для логина
  const handleLogin = (email, password) => {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setInfoTooltipPopupOpen(true);
        setIsSuccess(true);
      })
      .then((res) => navigate('/movies', { replace: true }))
      .catch((err) => {
        console.error(err);
        setInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setIsLoading(false);
    closeAllPopups();
    navigate('/', { replace: true });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    } else setLoggedIn(false);
  }, [navigate]);

  const closeAllPopups = () => {
    setInfoTooltipPopupOpen(false);
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    if (loggedIn) {
      MainApi.setToken();
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([me, apiSavedMovies]) => {
          setCurrentUser(me);
          setSavedMovies(
            apiSavedMovies.filter((film) => film.owner === me._id)
          );
        })
        .catch(async (err) => {
          setIsSuccess(false);
          setInfoTooltipPopupOpen(true);
        })
        .finally(() => {});
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route
          exact
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/movies" />
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
            <>
              <Header />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        name={'info'}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
