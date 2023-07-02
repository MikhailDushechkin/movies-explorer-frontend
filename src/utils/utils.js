import { SHORT_MOVIE } from './constants';

const handleConvertDuration = (duration) => {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours < 1) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

const handleMovieSearch = (movies, searchQuery, isSavedMovies) => {
  const normalizeSearchQuery = searchQuery.toLowerCase().trim();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) ||
      normalizeNameEn.includes(normalizeSearchQuery)
    );
  });
  if (!isSavedMovies) {
    localStorage.setItem('storegeFoundMovies', JSON.stringify(result));
    localStorage.setItem('storegeMoviesSearch', normalizeSearchQuery);
  } else {
    localStorage.setItem('storageSavedMoviesSearch', normalizeSearchQuery);
  }
  return result;
};

const handleMovieFilter = (movies, isFiltered, isSavedMovies) => {
  if (!isSavedMovies) {
    localStorage.setItem('storegeIsMoviesFiltered', isFiltered);
  } else {
    localStorage.setItem('storegeIsSavedMoviesFiltered', isFiltered);
  }
  if (isFiltered) {
    const result = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
    return result;
  } else {
    return movies;
  }
};

export { handleConvertDuration, handleMovieSearch, handleMovieFilter };
