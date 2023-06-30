import React from 'react';
import { useLocation } from 'react-router-dom';

import MainApi from '../../utils/MainApi';
import { handleConvertDuration } from '../../utils/utils';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import './MoviesCard.css';

function MoviesCard({ movie, saveStatus, handleSaveMovie, handleDeleteMovie }) {
  const { pathname } = useLocation();
  const { savedMovies, setSavedMovies } = React.useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = React.useState(false);
  const [mainApiId, setMainApiId] = React.useState('');

  React.useEffect(() => {
    setIsSaved(saveStatus.isSaved);
    setMainApiId(saveStatus.id);
  }, [saveStatus]);

  function saveMovie() {
    handleSaveMovie({ movie, setIsSaved, savedMovies, setSavedMovies });
  }


  function deleteMovies() {
    handleDeleteMovie({mainApiId, setSavedMovies, setIsSaved})
  }

  const { nameRU, trailerLink, thumbnail, duration } = movie;

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
        <img src={thumbnail} alt={nameRU} className="card__image"></img>
      </a>
      <button
        className={`card__button ${
          pathname === '/movies' && isSaved && 'card__button_saved'
        } ${pathname === '/saved-movies' && 'card__button_delete'}`}
        type="button"
        aria-label={'save movie'}
        onClick={isSaved ? deleteMovies : saveMovie}
      >
        {!isSaved && !(pathname === '/saved-movies') && 'Сохранить'}
      </button>
    </li>
  );
}

export default MoviesCard;
