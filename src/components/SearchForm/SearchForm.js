import React from 'react';
import { useLocation } from 'react-router-dom';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useValidation from '../../hooks/useValidation';

import { SearchMessage } from '../../utils/constants';

import './SearchForm.css';

function SearchForm({
  handleSubmitSearch,
  handleChangeCheckbox,
  showError,
  isLoading,
}) {
  const { pathname } = useLocation();

  const { values, setValues, onChange, isFormValid, setFormValid } = useValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    isFormValid
      ? handleSubmitSearch(values.keyWord)
      : showError(SearchMessage.EMPTY);
  };

  React.useEffect(() => {
    if (pathname === '/movies') {
      const storageKeyWord = localStorage.getItem('storageKeyWord');
      storageKeyWord && setValues({ keyWord: storageKeyWord });
      setFormValid(true);
    } else {
      setValues({ keyWord: '' });
    }
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
            value={values.keyWord || ''}
            className="search-form__input"
            type="text"
            name="keyWord"
            id='keyWord'
            placeholder="Фильм"
            required
            onChange={onChange}
            disabled={isLoading}
          />
          <button
            className="search-form__submit-button"
            type="submit"
            aria-label="Поиск"
            disabled={isLoading}
          />
        </form>
        <FilterCheckbox handleCheckbox={handleChangeCheckbox} />
      </div>
    </section>
  );
}

export default SearchForm;
