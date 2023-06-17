import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content-block">
          <ul className="about-project__description-block">
            <li className="about-project__item">
              <h3 className="about-project__subtitle">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about-project__description">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </li>
            <li className="about-project__item">
              <h3 className="about-project__subtitle">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about-project__description">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </li>
          </ul>
          <div className="about-project__timeline">
            <div className="about-project__stage about-project__stage_first">
              <p className="about-project__stage-text about-project__stage-text_green">
                1 неделя
              </p>
              <p className="about-project__stage-caption">Back-end</p>
            </div>
            <div className="about-project__stage about-project__stage_second">
              <p className="about-project__stage-text about-project__stage-text_gray">
                4 недели
              </p>
              <p className="about-project__stage-caption">Front-end</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
