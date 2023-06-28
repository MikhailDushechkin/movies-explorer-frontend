import { Navigate } from 'react-router-dom';

import AuthScreen from '../AuthScreen/AuthScreen';
import useValidation from '../../hooks/useValidation';
import './Login.css';

function Login({ handleLogin, loggedIn, isLoading }) {
  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  return !loggedIn ? (
    <main className="login">
      <AuthScreen
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText="Войти"
      >
        <label className="form__input-container">
          E-mail
          <input
            className={`form__input ${
              errors.email ? 'form__input_style_error' : ''
            }`}
            type="email"
            name="email"
            form="login"
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
            form="login"
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

export default Login;
