import React from 'react';
import { useLocation } from 'react-router-dom';

import { handleConvertDuration } from '../../utils/utils';
import { MOVIES_BASE_URL } from '../../utils/constants';

import './MoviesCard.css';

function MoviesCard({ movie, isSaved, onMovieSave, onMovieDelete }) {
  const { pathname } = useLocation();

  const handleSaveClick = () => {
    onMovieSave(movie);
  };

  const handleDeleteClick = () => {
    onMovieDelete(movie);
  };

  return (
    <li className="card">
      <div className="card__header-block">
        <h3 className="card__title">{movie.nameRU}</h3>
        <p className="card__duration">
          {handleConvertDuration(movie.duration)}
        </p>
      </div>
      <a
        href={movie.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            pathname === '/movies'
              ? `${MOVIES_BASE_URL}${movie.image.url}`
              : `${movie.image}`
          }
          alt={movie.nameRU}
          className="card__image"
        ></img>
      </a>
      <button
        className={`card__button ${
          pathname === '/movies' && isSaved && 'card__button_saved'
        } ${pathname === '/saved-movies' && 'card__button_delete'}`}
        type="button"
        aria-label={'save movie'}
        onClick={isSaved ? handleDeleteClick : handleSaveClick}
      >
        {!isSaved && !(pathname === '/saved-movies') && 'Сохранить'}
      </button>
    </li>
  );
}

export default MoviesCard;
