import { Navigate } from 'react-router-dom';

import './Register.css';

import AuthScreen from '../AuthScreen/AuthScreen';
import useValidation from '../../hooks/useValidation';

import { USER_NAME_REG_EXP } from "../../utils/constants";

function Register({ handleRegister, isLoading, loggedIn }) {
  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
  }

  return !loggedIn ? (
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
            pattern={USER_NAME_REG_EXP}
            id="name-input"
            placeholder="Миша"
            onChange={onChange}
            disabled={isLoading ? true : false}
            value={values.name || ''}
          />
          <span
            className={`form__input-error ${
              errors.name ? 'form__input-error_type_active' : ''
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
            disabled={isLoading ? true : false}
            value={values.email || ''}
          />
          <span
            className={`form__input-error ${
              errors.email ? 'form__input-error_type_active' : ''
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
            disabled={isLoading ? true : false}
            value={values.password || ''}
          />
          <span
            className={`form__input-error ${
              errors.password ? 'form__input-error_type_active' : ''
            }`}
          >
            {errors.password || ''}
          </span>
        </label>
      </AuthScreen>
    </main>
  ) : (
    <Navigate to="/" replace />
  );
}

export default Register;
