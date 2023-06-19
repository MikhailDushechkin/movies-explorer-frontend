import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../utils/data.json'

function Movies() {
  return (
    <main>
      <SearchForm/>
      <MoviesCardList movies={movies}/>
    </main>
  )
}

export default Movies;
