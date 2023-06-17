import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__down">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <ul className="footer__link-block">
            <li className="footer__link-item">
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link-item">
              <a
                href="https://github.com/MikhailDushechkin"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
