import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { SearchMessage } from '../../utils/constants';
import { filterMovies } from '../../utils/utils';

function SavedMovies({ handleDeleteMovie }) {
  const { savedMovies } = React.useContext(CurrentUserContext);
  const [movies, setMovies] = React.useState([]);
  const [searchParams, setSearchParams] = React.useState({
    keyWord: '',
    isShort: false,
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const getFilteredMovies = (keyWord, isShort) => {
    const filteredMovies = filterMovies(savedMovies, keyWord, isShort);
    filteredMovies.length === 0
      ? setErrorMessage(SearchMessage.NOT_FOUND)
      : setErrorMessage('');
    !savedMovies.length
      ? setErrorMessage(SearchMessage.NOT_SAVED)
      : setErrorMessage('');
    setMovies(filteredMovies);
  };

  React.useEffect(() => {
    setMovies(savedMovies);
    getFilteredMovies(searchParams.keyWord, searchParams.isShort);
    !savedMovies.length
      ? setErrorMessage(SearchMessage.NOT_SAVED)
      : setErrorMessage('');
  }, [savedMovies]);

  const handleSubmitSearch = (word) => {
    setSearchParams({ ...searchParams, keyWord: word });
    getFilteredMovies(word, searchParams.isShort);
  };

  const handleCheckbox = (isChecked) => {
    setSearchParams({ ...searchParams, isShort: isChecked });
    getFilteredMovies(searchParams.keyWord, isChecked);
  };

  const renderMoviesSection = () => {
    if (errorMessage.length) {
      return <p className="cards__search-message">{errorMessage}</p>;
    }
    return (
      <MoviesCardList movies={movies} handleDeleteMovie={handleDeleteMovie} />
    );
  };

  return (
    <main className="saved-movies-main">
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleCheckbox={handleCheckbox}
        showError={setErrorMessage}
      />
      {renderMoviesSection()}
    </main>
  );
}

export default SavedMovies;
