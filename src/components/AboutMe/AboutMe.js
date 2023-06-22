import './AboutMe.css';
import photoMe from '../../images/author-me.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  function calculateAge() {
    const birthDate = new Date(1997, 11, 20);
    const todayDate = new Date();
    const addOne =
      todayDate.getMonth() - birthDate.getMonth() >= 0 &&
      todayDate.getDate() - birthDate.getDate() >= 0;
    const diff = todayDate.getFullYear() - birthDate.getFullYear();
    return diff - 1 + (addOne ? 1 : 0);
  }

  return (
    <section className="about-me" id='about-me'>
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info-wrapper">
          <div className="about-me__bio">
            <h3 className="about-me__name">Михаил</h3>
            <p className="about-me__profession">
              Фронтенд-разработчик, {calculateAge()} лет
            </p>
            <p className="about-me__text">Я Миша, вырос и живу в Москве. Отучился на бизнес-информатика. Мы изучали множество языков программирования и из всего я выделил для себя javascript - фронтенд разработку. Но в студенческие годы я увлекся различными бизнесами и занимался ими до 2022 года. Дальше мне захотелось развиваться как разработчик и я стал вспоминать материал, но это было крайне сложно и вот я нашел спасение - Яндекс.Практикум, который всё структурировал и дает только нужные в практике знания!</p>
            <a
              href="https://github.com/MikhailDushechkin"
              target="_blank"
              rel="noreferrer"
              className="about-me__social"
            >
              GitHub
            </a>
          </div>
          <img
            className="about-me__photo"
            src={photoMe}
            alt="Фотография создателя сайта Михаила"
          />
        </div>
        <Portfolio/>
      </div>
    </section>
  );
}

export default AboutMe;
