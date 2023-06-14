import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AccountLink from '../AccountLink/AccountLink';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <header className="header">
      <div className="header__block">
        <Logo />
        {isLoggedIn ? (
          <>
            <Navigation /> <AccountLink />
          </>
        ) : (
          <nav className="header__menu">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link_login">
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
