import React from 'react';
import isEmail from 'validator/es/lib/isEmail';

function useValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setFormValid] = React.useState(false);

  function onChange(e) {
    const { value, name } = e.target;

    if (name === 'name' && e.target.validity.patternMismatch) {
      e.target.setCustomValidity(
        'Поле Имя должно содержать только кириллицу, латиницу, пробел или дефис'
      );
    } else if (name === 'email' && !isEmail(value)) {
      e.target.setCustomValidity(
        'Поле email должно соответствовать шаблону, например: test@yandex.ru'
      );
    } else {
      e.target.setCustomValidity('');
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setFormValid(e.target.closest('form').checkValidity());
  }

  const resetValidation = React.useCallback(
    (isFormValid = false, values = {}, errors = {}) => {
      setFormValid(isFormValid);
      setValues(values);
      setErrors(errors);
    },
    [setFormValid, setValues, setErrors]
  );

  return {
    values,
    errors,
    setValues,
    isFormValid,
    setFormValid,
    onChange,
    resetValidation,
  };
}

export default useValidation;
