import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import { SearchMessage } from '../../utils/constants';

function MoviesCardList({
  movies,
  savedMovies,
  MoviesRendered,
  onMovieSave,
  onMovieDelete,
  isLoading,
  isMoviesNotFound,
  setMoviesNotFound,
  queryError,
}) {
  const [MoviesRender, setMoviesRender] = React.useState([]);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/movies' && movies.length) {
      const result = movies.filter((movie, index) => {
        return index < MoviesRendered.total;
      });
      setMoviesRender(result);
    }
  }, [pathname, movies, MoviesRendered]);

  React.useEffect(() => {
    if (pathname === '/saved-movies') {
      setMoviesRender(movies);
    }
  }, [pathname, movies]);

  const handleMoreButton = () => {
    const start = MoviesRender.length;
    const end = start + MoviesRendered.more;
    const count = movies.length - start;
    if (count > 0) {
      const additionalCards = movies.slice(start, end);
      setMoviesRender([...MoviesRender, ...additionalCards]);
    }
  };

  const handleSavedStatus = (savedMovies, movieCard) => {
    return savedMovies.find((movie) => {
      return movie.movieId === (movieCard.id || movieCard.movieId);
    });
  };

  React.useEffect(() => {
    setMoviesNotFound(false);
  }, [pathname]);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__conteiner">
        {isMoviesNotFound && (
          <p className="cards__search-message">{SearchMessage.NOT_FOUND}</p>
        )}
        {queryError && (
          <p className="cards__search-message">{SearchMessage.EMPTY}</p>
        )}
        {pathname === '/saved-movies' && savedMovies.length === 0 && (
          <p className="cards__search-message">{SearchMessage.NOT_SAVED}</p>
        )}
        <ul className="movies-card-list__list">
          {MoviesRender.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              isSaved={handleSavedStatus(savedMovies, movie)}
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
            />
          ))}
        </ul>
        {MoviesRender.length >= 5 ? (
          <button
            className="movies-card-list__more-button"
            type="button"
            onClick={handleMoreButton}
          >
            Ещё
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
