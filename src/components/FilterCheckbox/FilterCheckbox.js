import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = ({ onFilterChange, isFiltered, isSearched }) => {
  return (
    <div className="checkbox">
      <label className="checkbox__content">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={isFiltered}
          disabled={isSearched ? true : false}
          onChange={(evt) => onFilterChange(evt.target.checked)}
        />
        <span className="checkbox__slider" />
        <span className="checkbox__name">Короткометражки</span>
      </label>
    </div>
  );
};

export default FilterCheckbox;
