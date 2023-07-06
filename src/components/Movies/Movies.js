import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import useResizeScreen from '../../hooks/useResizeScreen';

import './Movies.css';

import { handleMovieSearch, handleMovieFilter } from '../../utils/utils';
import { Breakpoint, Length } from '../../utils/constants';

function Movies({
  isLoading,
  savedMovies,
  onSearch,
  onMovieSave,
  onMovieDelete,
  setQueryError,
  queryError,
}) {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [MoviesRender, setMoviesRender] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [MoviesRendered, setMoviesRendered] = React.useState({});
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [isMoviesNotFound, setMoviesNotFound] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);

  const screenWidth = useResizeScreen();

  const handleSearchAndFilter = React.useCallback(
    (movies, searchQuery) => {
      const foundMovies = handleMovieSearch(movies, searchQuery, false);
      setFoundMovies(foundMovies);
      if (foundMovies.length) {
        const filtered = handleMovieFilter(foundMovies, isFiltered, false);
        setIsSearched(false);
        setMoviesRender(filtered);
        if (!filtered.length) {
          setIsSearched(false);
          setMoviesNotFound(true);
        }
      } else {
        setMoviesNotFound(true);
        setIsSearched(false);
        setMoviesRender(foundMovies);
      }
    },
    [isFiltered]
  );

  const handleOnSearchSubmit = React.useCallback(
    async (searchQuery) => {
      setMoviesNotFound(false);
      setIsSearched(true);
      if (localStorage.getItem('storageAllMovies')) {
        const movies = JSON.parse(
          localStorage.getItem('storageAllMovies')
        );
        handleSearchAndFilter(movies, searchQuery);
      } else {
        const moviesData = await onSearch();
        if (moviesData) {
          setInitialMovies(moviesData);
          handleSearchAndFilter(moviesData, searchQuery);
          localStorage.setItem('storageAllMovies', JSON.stringify(moviesData));
        }
      }
    },
    [handleSearchAndFilter, onSearch]
  );

  const handleOnFilterClick = React.useCallback(
    (isChecked) => {
      setIsFiltered(isChecked);
      setMoviesNotFound(false);
      const filtered = handleMovieFilter(foundMovies, isChecked, false);
      setMoviesRender(filtered);
      if (!filtered.length) {
        setMoviesNotFound(true);
      }
    },
    [foundMovies]
  );

  React.useEffect(() => {
    if (screenWidth >= Breakpoint.DESKTOP) {
      setMoviesRendered(Length.DESKTOP);
    } else if (
      screenWidth < Breakpoint.DESKTOP &&
      screenWidth >= Breakpoint.TABLET
    ) {
      setMoviesRendered(Length.TABLET);
    } else {
      setMoviesRendered(Length.MOBILE);
    }
  }, [screenWidth]);

  React.useEffect(() => {
    if (
      localStorage.getItem('storageFoundMovies') &&
      localStorage.getItem('storageIsMoviesFiltered')
    ) {
      const filter = JSON.parse(
        localStorage.getItem('storageIsMoviesFiltered')
      );
      setIsFiltered(filter);
      const foundMovies = JSON.parse(
        localStorage.getItem('storageFoundMovies')
      );
      setFoundMovies(foundMovies);
      if (!foundMovies.length) {
        setMoviesNotFound(true);
        setMoviesRender(foundMovies);
      } else {
        const filtered = handleMovieFilter(foundMovies, filter, false);
        setMoviesRender(filtered);
        if (!filtered.length) {
          setMoviesNotFound(true);
        }
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        isFiltered={isFiltered}
        isSearched={isSearched}
        onSearch={handleOnSearchSubmit}
        onFilterChange={handleOnFilterClick}
        setQueryError={setQueryError}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={MoviesRender}
          MoviesRendered={MoviesRendered}
          isMoviesNotFound={isMoviesNotFound}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          isLoading={isLoading}
          queryError={queryError}
          savedMovies={savedMovies}
          setMoviesNotFound={setMoviesNotFound}
        />
      )}
    </main>
  );
}

export default Movies;
