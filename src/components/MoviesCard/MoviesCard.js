import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
  const handleSaveMovie = () => setIsSaved(true);
  const handleDeleteMovie = () => setIsSaved(false);

  const { nameRU, trailerLink, image, duration } = movie;

  const handleConvertDuration = (duration) => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  };

  return (
    <li className="card">
      <div className="card__header-block">
        <h3 className="card__title">{nameRU}</h3>
        <p className="card__duration">{handleConvertDuration(duration)}</p>
      </div>
      <a
        href={trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`https://api.nomoreparties.co${image.url}`}
          alt={nameRU}
          className="card__image"
        ></img>
      </a>
      <button
        className={`card__button ${
          (pathname === '/movies' && isSaved) && 'card__button_saved'
        } ${pathname === '/saved-movies' && 'card__button_delete'}`}
        type="button"
        aria-label={'save movie'}
        onClick={isSaved ? handleDeleteMovie : handleSaveMovie}>
          {(!isSaved && !(pathname === '/saved-movies')) && 'Сохранить'}
        </button>
    </li>
  );
}

export default MoviesCard;
