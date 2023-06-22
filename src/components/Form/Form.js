import { useLocation } from "react-router-dom";

import './Form.css';

function Form({
  name,
  onSubmit,
  isEditing,
  isFormValid,
  buttonText,
  ...props
}) {
  const location = useLocation();

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <button
        type="submit"
        form={`${name}`}
        className={`form__button-submit ${
          name === 'edit-profile' && !isEditing
            ? 'form__button-submit_hidden'
            : ''
        } ${location.pathname === '/signup' && 'form__button-submit_signup'} ${location.pathname === '/signin' && 'form__button-submit_signin'}`}
        disabled={isFormValid ? false : true}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
