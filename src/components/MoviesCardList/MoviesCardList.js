import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isLiked, onCardLike }) {
  const handleMoreClick = () => {};

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__conteiner">
        <ul className="movies-card-list__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              isLiked={isLiked}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
        <button
          className="movies-card-list__more-button"
          type="button"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
