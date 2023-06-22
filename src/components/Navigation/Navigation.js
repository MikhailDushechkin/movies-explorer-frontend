import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

import AccountLink from '../AccountLink/AccountLink';

function Navigation({ isMenuOpened, onClose }) {
  const location = useLocation();

  return (
    <nav className={`navigation ${isMenuOpened && 'navigation_opened'}`}>
      <ul className={`navigation__menu-wrapper`}>
        <li
          className={`navigation__menu-item  navigation__menu-item_hidden
          `}
        >
          <Link
            to="/"
            onClick={onClose}
            className={`navigation__link ${
              location.pathname === '/'
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
              location.pathname === '/movies'
                ? 'navigation__link_header-active'
                : ''
            } ${
              location.pathname === '/movies'
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
              location.pathname === '/saved-movies'
                ? 'navigation__link_header-active'
                : ''
            } ${
              location.pathname === '/saved-movies'
                ? 'navigation__link_side-menu-active'
                : ''
            }`}
          >
            Сохранённые фильмы
          </Link>
        </li>
        {isMenuOpened && <li className="navigation__menu-item">
          <AccountLink isOpenedMenu={isMenuOpened}/>
          </li>}
      </ul>
    </nav>
  );
}

export default Navigation;
