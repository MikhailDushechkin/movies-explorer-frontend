import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Breakpoint, Length } from '../../utils/constants';

function MoviesCardList({ movies, handleSaveMovie, handleDeleteMovie }) {
  const { pathname } = useLocation();
  const { savedMovies } = React.useContext(CurrentUserContext);
  const [chunkLength, setChunkLength] = React.useState(0);
  const [isMoreButton, setIsMoreButton] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const handleResizeWindow = () => setWindowWidth(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  React.useEffect(() => {
    if (windowWidth <= Breakpoint.MOBILE) {
      setChunkLength(Length.MOBILE);
    } else if (windowWidth <= Breakpoint.TABLET) {
      setChunkLength(Length.TABLET);
    } else {
      setChunkLength(Length.DESKTOP);
    }
  }, [windowWidth, movies.length]);

  React.useEffect(() => {
    if (pathname === '/movies') {
      movies.length > chunkLength
        ? setIsMoreButton(true)
        : setIsMoreButton(false);
    } else {
      setIsMoreButton(false);
    }
  }, [pathname, movies.length, chunkLength]);

  const handleMoreClick = () => {
    setChunkLength((current) => {
      if (windowWidth <= Breakpoint.TABLET) {
        return current + 2;
      }
      return current + 3;
    });
  };

  const checkIsSaved = (movie) => {
    const targetMovie = savedMovies.find(
      (film) => film.movieId === movie.movieId
    );
    return targetMovie
      ? { isSaved: true, id: targetMovie._id }
      : { isSaved: false, id: '' };
  };

  const renderMovieCards = () => {
    if (pathname === '/movies') {
      return movies.length
        ? movies
            .slice(0, chunkLength)
            .map((movie) => (
              <MoviesCard
                key={movie.movieId}
                movie={movie}
                saveStatus={checkIsSaved(movie)}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))
        : '';
    } else {
      return movies.length
        ? movies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              saveStatus={{ isSaved: true, id: movie._id }}
              handleDeleteMovie={handleDeleteMovie}
            />
          ))
        : '';
    }
  };

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__conteiner">
        <ul className="movies-card-list__list">{renderMovieCards()}</ul>
        {isMoreButton ? (
          <button
            className="movies-card-list__more-button"
            type="button"
            onClick={handleMoreClick}
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
