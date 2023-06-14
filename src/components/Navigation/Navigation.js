import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

function Navigation({ isBurgerMenu, onClose }) {
  const location = useLocation();

  return (
    <nav className={`navigation ${!isBurgerMenu ? 'navigation_hidden' : ''}`}>
      <ul
        className={`navigation__menu-wrapper ${
          isBurgerMenu ? 'navigation__menu-wrapper_burger' : ''
        }`}
      >
        <li
          className={`navigation__menu-item ${
            isBurgerMenu ? '' : 'navigation__menu-item_hidden'
          }`}
        >
          <Link
            to="/"
            onClick={onClose}
            className={`navigation__link ${
              isBurgerMenu ? 'navigation__link_side-menu' : ''
            } ${
              location.pathname === '/' && isBurgerMenu
                ? 'navigation__link_side-menu-active'
                : ''
            }`}
          >
            Главная
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/movies"
            onClick={onClose}
            className={`navigation__link ${
              isBurgerMenu ? 'navigation__link_side-menu' : ''
            } ${
              location.pathname === '/movies' && !isBurgerMenu
                ? 'navigation__link_header-active'
                : ''
            } ${
              location.pathname === '/movies' && isBurgerMenu
                ? 'navigation__link_side-menu-active'
                : ''
            }`}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/saved-movies"
            onClick={onClose}
            className={`navigation__link ${
              isBurgerMenu ? 'navigation__link_side-menu' : ''
            } ${
              location.pathname === '/saved-movies' && !isBurgerMenu
                ? 'navigation__link_header-active'
                : ''
            } ${
              location.pathname === '/saved-movies' && isBurgerMenu
                ? 'navigation__link_side-menu-active'
                : ''
            }`}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
