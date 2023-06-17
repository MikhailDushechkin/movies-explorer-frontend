import React from 'react';
import { Link, useLocation } from "react-router-dom";

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AccountLink from '../AccountLink/AccountLink';
import Burger from '../Burger/Burger';

function Header() {
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();

  return (
    <header className={`header ${(location.pathname === '/' && !loggedIn) && 'header_blue'}`}>
      <div className="header__block">
        {loggedIn && <Burger
          loggedIn={loggedIn}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />}
        <Logo />
        {loggedIn ? (
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
