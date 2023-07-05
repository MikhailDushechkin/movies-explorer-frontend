export const MOVIES_BASE_URL = 'https://api.nomoreparties.co';
export const BEATFILM_MOVIES_URL =
  'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_BASE_URL = 'https://api.dmm.movies.nomoredomains.rocks';

export const USER_NAME_REG_EXP = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';
export const HTTP_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const SHORT_MOVIE = 40;

export const SearchMessage = {
  NOT_SAVED: 'У вас нет сохранённых фильмов',
  SEARCH_ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  EMPTY: 'Нужно ввести ключевое слово',
  NOT_FOUND: 'Ничего не найдено',
};

export const InfoMessage = {
  AUTH_SUCCESS: 'Добро пожаловать!',
  REG_SUCCESS: 'Регистрация прошла успешно!',
  AUTH_FAILED: 'Что-то пошло не так! Попробуйте ещё раз.',
  EDIT_SUCCESS: 'Данные успешно изменены!',
  EDIT_FAILED: 'Не удалось внести изменения, повторите попытку.'
};

export const Breakpoint = {
  DESKTOP: 1280,
  TABLET: 780,
  MOBILE: 320,
};

export const Length = {
  DESKTOP: {
    total: 12,
    more: 3,
  },
  TABLET: {
    total: 8,
    more: 2,
  },
  MOBILE: {
    total: 5,
    more: 2,
  },
};
