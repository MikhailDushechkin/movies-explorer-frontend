import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({ handleSubmitSearch }) {
  const [keyWord, setKeyWord] = React.useState('');
  const [isShort, setIsShot] = React.useState(false);

  const handleInputKeyWord = (evt) => setKeyWord(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitSearch(keyWord);
  };

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
            value={keyWord}
            className="search-form__input"
            type="text"
            name="search"
            placeholder="Фильм"
            required
            onChange={handleInputKeyWord}
          />
          <button
            className="search-form__submit-button"
            type="submit"
            aria-label="Поиск"
          />
        </form>
        <FilterCheckbox isShort={isShort} setIsShot={setIsShot} />
      </div>
    </section>
  );
}

export default SearchForm;
