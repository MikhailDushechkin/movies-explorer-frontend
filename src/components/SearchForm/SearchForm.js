import React from 'react';
import { useLocation } from 'react-router-dom';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({
  onSearch,
  onFilterChange,
  isFiltered,
  isSearched,
  setQueryError,
}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { pathname } = useLocation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (pathname === '/movies') {
      searchQuery ? onSearch(searchQuery) : setQueryError(true);
    } else {
      onSearch(searchQuery);
    }
  };

  React.useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('storageMoviesSearch')) {
      const savedSearchQuery = localStorage.getItem('storageMoviesSearch');
      setSearchQuery(savedSearchQuery);
    } else if (
      pathname === '/saved-movies' &&
      localStorage.getItem('storageSavedMoviesSearch')
    ) {
      const savedSearchQuery = localStorage.getItem('savedMoviesSearch');
      setSearchQuery(savedSearchQuery);
    }
  }, [pathname]);

  React.useEffect(() => {
    setQueryError(false);
  }, [searchQuery]);

  React.useEffect(() => {
    setSearchQuery('');
  }, [pathname]);

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          className="search-form__form"
          name="form-search"
          id="search-and-filter"
          action="#"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            value={searchQuery || ''}
            className="search-form__input"
            type="text"
            name="keyWord"
            id="keyWord"
            placeholder="Фильм"
            required
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-form__submit-button"
            type="submit"
            aria-label="Поиск"
          />
        </form>
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFiltered={isFiltered}
          isSearched={isSearched}
        />
      </div>
    </section>
  );
}

export default SearchForm;
