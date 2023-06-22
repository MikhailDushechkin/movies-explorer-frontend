import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';

import userData from './utils/userData.json';

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
