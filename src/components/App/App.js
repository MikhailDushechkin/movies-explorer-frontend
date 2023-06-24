import { Routes, Route } from 'react-router-dom';

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

import userData from '../../utils/userData.json';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/signup"
        element={
          <>
            <Register />
          </>
        }
      />
      <Route
        exact
        path="/signin"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        exact
        path="/"
        element={
          <>
            <Header />
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
            <Profile user={userData} />
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
