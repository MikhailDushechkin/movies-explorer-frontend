import { Link } from "react-router-dom";

import './NotFound.css';

function NotFound() {
  return (
    <div className='not-found'>
      <div className="not-found__wrapper">
        <p className="not-found__title">404</p>
        <p className="not-found__description">Страница не найдена</p>
        <Link to="/" className="not-found__link">Назад</Link>
      </div>
    </div>
  )
}

export  default NotFound;
