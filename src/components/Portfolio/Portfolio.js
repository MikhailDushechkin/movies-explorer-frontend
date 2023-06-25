import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MikhailDushechkin/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <span className="portfolio__link-symbol">&#x2197;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MikhailDushechkin/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <span className="portfolio__link-symbol">&#x2197;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://dmm.front.mesto.nomoredomains.monster/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <span className="portfolio__link-symbol">&#x2197;</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
