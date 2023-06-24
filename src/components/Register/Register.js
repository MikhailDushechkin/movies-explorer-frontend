import './Register.css';

import AuthScreen from '../AuthScreen/AuthScreen';
import useValidation from '../../hooks/useValidation';

function Register() {
  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="register">
      <AuthScreen
        title="Добро пожаловать!"
        name="register"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label className="form__input-container">
          Имя
          <input
            className={`form__input ${
              errors.name ? 'form__input_style_error' : ''
            }`}
            type="text"
            name="name"
            form="register"
            required
            minLength="2"
            maxLength="30"
            id="name-input"
            placeholder="Миша"
            onChange={onChange}
            value={values.name || ''}
          />
          <span
            className={`form__input-error ${
              errors.name ? 'form__input-error_active' : ''
            }`}
          >
            {errors.name || ''}
          </span>
        </label>
        <label className="form__input-container">
          E-mail
          <input
            className={`form__input ${
              errors.email ? 'form__input_style_error' : ''
            }`}
            type="email"
            name="email"
            form="register"
            required
            id="email-input"
            placeholder="misha@yandex.ru"
            onChange={onChange}
            value={values.email || ''}
          />
          <span
            className={`form__input-error ${
              errors.email ? 'form__input-error_active' : ''
            }`}
          >
            {errors.email || ''}
          </span>
        </label>
        <label className="form__input-container">
          Пароль
          <input
            className={`form__input ${
              errors.password ? 'form__input_style_error' : ''
            }`}
            type="password"
            name="password"
            form="register"
            required
            minLength="6"
            maxLength="30"
            id="password-input"
            placeholder="******"
            onChange={onChange}
            value={values.password || ''}
          />
          <span
            className={`form__input-error ${
              errors.password ? 'form__input-error_active' : ''
            }`}
          >
            {errors.password || ''}
          </span>
        </label>
      </AuthScreen>
    </main>
  );
}

export default Register;
