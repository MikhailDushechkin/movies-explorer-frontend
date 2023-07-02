import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { handleMovieSearch, handleMovieFilter } from '../../utils/utils';

function SavedMovies({ savedMovies, onMovieDelete, setQueryError }) {
  const [MoviesRender, setMoviesRender] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [isMoviesNotFound, setMoviesNotFound] = React.useState(false);

  const handleOnSearchSubmit = React.useCallback(
    (searchQuery) => {
      setMoviesNotFound(false);
      setIsSearched(true);
      if (savedMovies.length) {
        const found = handleMovieSearch(savedMovies, searchQuery, true);
        setFilteredMovies(found);
        if (!found.length) {
          setMoviesNotFound(true);
          setIsSearched(false);
          setMoviesRender(found);
        } else {
          const filtered = handleMovieFilter(found, isFiltered, true);
          setIsSearched(false);
          setMoviesRender(filtered);
          if (!filtered.length) {
            setIsSearched(false);
            setMoviesNotFound(true);
          }
        }
      } else {
        setIsSearched(false);
        setMoviesNotFound(true);
      }
    },
    [savedMovies, isFiltered]
  );

  const handleOnFilterClick = React.useCallback(
    (isChecked) => {
      setIsFiltered(isChecked);
      setMoviesNotFound(false);
      const filtered = handleMovieFilter(filteredMovies, isChecked, true);
      setMoviesRender(filtered);
      if (!filtered.length) {
        setMoviesNotFound(true);
      }
    },
    [filteredMovies]
  );

  React.useEffect(() => {
    setMoviesNotFound(false);
    if (
      localStorage.getItem('savedMoviesSearchQuery') &&
      localStorage.getItem('isSavedMoviesFiltered')
    ) {
      const filter = JSON.parse(localStorage.getItem('isSavedMoviesFiltered'));
      setIsFiltered(filter);
      const searchQuery = localStorage.getItem('savedMoviesSearchQuery');
      const foundMovies = handleMovieSearch(savedMovies, searchQuery, true);
      setFilteredMovies(foundMovies);
      if (foundMovies.length) {
        const filtered = handleMovieFilter(foundMovies, filter, true);
        setMoviesRender(filtered);
        if (!filtered.length) {
          setMoviesNotFound(true);
        } else {
          setMoviesNotFound(true);
          setMoviesRender(foundMovies);
        }
      }
    } else if (
      !localStorage.getItem('storageSavedMoviesSearch') &&
      localStorage.getItem('storageIsSavedMoviesFiltered')
    ) {
      setFilteredMovies(savedMovies);
      const filter = JSON.parse(
        localStorage.getItem('storageIsSavedMoviesFiltered')
      );
      setIsFiltered(filter);
      const filtered = handleMovieFilter(savedMovies, filter, true);
      setMoviesRender(filtered);
      if (!filtered.length) {
        setMoviesNotFound(true);
      }
    } else {
      setMoviesRender(savedMovies);
      setFilteredMovies(savedMovies);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    if (savedMovies.length) {
      savedMovies.reverse();
    } else {
      setMoviesNotFound(false);
    }
  }, [savedMovies]);

  return (
    <main className="saved-movies-main">
      <SearchForm
        onSearch={handleOnSearchSubmit}
        onFilterChange={handleOnFilterClick}
        isFiltered={isFiltered}
        isSearched={isSearched}
        setQueryError={setQueryError}
      />
      <MoviesCardList
        movies={MoviesRender}
        savedMovies={savedMovies}
        isMoviesNotFound={isMoviesNotFound}
        onMovieDelete={onMovieDelete}
        setMoviesNotFound={setMoviesNotFound}
      />
    </main>
  );
}

export default SavedMovies;
