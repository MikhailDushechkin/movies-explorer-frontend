import React from 'react';

function useValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setFormValid] = React.useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage;
    const formValid = e.target.closest('form').checkValidity();
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    setFormValid(formValid);
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
    isFormValid,
    onChange,
    resetValidation,
  };
}

export default useValidation;
