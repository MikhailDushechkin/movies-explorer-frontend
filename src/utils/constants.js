export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_BASE_URL = 'https://api.dmm.movies.nomoredomains.rocks';

export const USER_NAME_REG_EXP = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

export const IMAGES_URL = 'https://api.nomoreparties.co';
export const SHORT_FILM_DURATION = 40;
export const HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const SearchMessage = {
  NOT_SAVED: 'У вас нет сохранённых фильмов',
  SEARCH_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  EMPTY: 'Нужно ввести ключевое слово',
  NOT_FOUND: 'Ничего не найдено',
}

export const Breakpoint = {
  MOBILE: 480,
  TABLET: 1010,
  DESKTOP: 1280,
};

export const Length = {
  MOBILE: 5,
  TABLET: 8,
  DESKTOP: 12,
}
