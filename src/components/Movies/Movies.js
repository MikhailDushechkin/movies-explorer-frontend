import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

import MoviesApi from '../../utils/MoviesApi';
import { SearchMessage } from '../../utils/constants';
import { filterMovies, normalizeMovies } from '../../utils/utils';

function Movies({
  isLoading,
  setIsLoading,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [keyWord, setKeyWord] = React.useState('');
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const storageMovies =
    JSON.parse(localStorage.getItem('storageAllMovies')) || [];

  React.useEffect(() => {
    const storageSearchResult =
      JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
    const storageIsShort =
      JSON.parse(localStorage.getItem('storageIsShort')) || false;

    storageSearchResult && setSearchedMovies(storageSearchResult);
    storageKeyWord && setKeyWord(storageKeyWord);
    storageIsShort && setIsShortMovies(storageIsShort);
  }, []);

  const getFilteredMovies = (keyWord, isShortMovies) => {
    if (!storageMovies.length) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((allMovies) => {
          const normalizedMovies = normalizeMovies(allMovies);
          localStorage.setItem(
            'storageMovies',
            JSON.stringify(normalizedMovies)
          );
          const filteredMovies = keyWord
            ? filterMovies(normalizedMovies, keyWord, isShortMovies)
            : [];
          handleFilterResult(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(SearchMessage.SEARCH_ERROR);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = keyWord
        ? filterMovies(storageMovies, keyWord, isShortMovies)
        : [];
      handleFilterResult(filteredMovies);
    }
  };

  const handleFilterResult = (movies) => {
    setSearchedMovies(movies);
    localStorage.setItem('storageSearchResult', JSON.stringify(movies));
    movies.length === 0
      ? setErrorMessage(SearchMessage.NOT_FOUND)
      : setErrorMessage('');
  };

  const handleSubmitSearch = (keyWord) => {
    setKeyWord(keyWord);
    localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMovies);
  };

  const handleCheckbox = (isChecked) => {
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWord, isChecked);
  };

  const renderMoviesSection = () => {
    if (errorMessage.length) {
      return <p className="cards__search-message">{errorMessage}</p>;
    }
    return (
      <MoviesCardList
        movies={searchedMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      />
    );
  };

  return (
    <main className="movies">
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleCheckbox={handleCheckbox}
        showError={setErrorMessage}
        isLoading={isLoading}
      />
      {isLoading ? <Preloader /> : renderMoviesSection()}
    </main>
  );
}

export default Movies;
