import { useNavigate } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleButtonBackClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <main>
      <section className="not-found">
        <div className="not-found__wrapper">
          <p className="not-found__title">404</p>
          <h1 className="not-found__description">Страница не найдена</h1>
          <button
            type="button"
            onClick={handleButtonBackClick}
            className="not-found__link"
          >
            Назад
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
