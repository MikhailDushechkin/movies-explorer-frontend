import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <Header />
            <Main />
            <Footer/>
          </>
        }
      />
      <Route
        exact
        path="/movies"
        element={
          <>
            <Header />
            <Movies/>
            <Footer/>
          </>
        }
      />
      <Route
          exact path='/saved-movies'
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />
    </Routes>
  );
}

export default App;
