import { Link } from 'react-router-dom';

import './AuthScreen.css';

import Logo from '../Logo/Logo';
import Form from '../Form/Form';

function AuthScreen({
  title,
  name,
  buttonText,
  onSubmit,
  isFormValid,
  ...props
}) {
  return (
    <section className="auth-screen">
      <Logo activePlace="auth" />
      <h1 className="form__title">{title}</h1>
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </Form>
      {name === 'register' ? (
        <p className="auth-screen__text">
          Уже зарегистрированы?{' '}
          <Link to="/signin" className="auth-screen__link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-screen__text">
          Ещё не зарегистрированы?{' '}
          <Link to="/signup" className="auth-screen__link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthScreen;
