import React from 'react';
import useValidation from '../../hooks/useValidation';

import './Profile.css';

import Form from '../Form/Form';

function Profile({ user }) {
  const [isEditing, setEditingStatus] = React.useState(false);
  const { values, errors, isFormValid, onChange, resetValidation } =
    useValidation();

  const handleEditClick = () => {
    setEditingStatus(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    resetValidation(true, user);
  }, [resetValidation, user]);

  return (
    <main className="profile">
      <section className="profile__wrapper">
        <h1
          className='profile__title'
        >
          {`Привет, ${user.name}`}!
        </h1>
        <Form
          name="edit-profile"
          buttonText="Сохранить"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isEditing={isEditing}
        >
          <label className="form__input-container form__input-container_type_edit-profile">
            Имя
            <input
              className={`form__input form__input_type_edit-profile ${
                errors.name ? 'form__input_style_error' : ''
              }`}
              id="name-input"
              type="text"
              name="name"
              form="edit-profile"
              required
              minLength="2"
              maxLength="30"
              disabled={isEditing ? false : true}
              onChange={onChange}
              value={values.name || ''}
            />
          </label>
          <label className="form__input-container form__input-container_type_edit-profile">
            E-mail
            <input
              className={`form__input form__input_type_edit-profile ${
                errors.email ? 'form__input_style_error' : ''
              }`}
              id="email-input"
              type="email"
              name="email"
              form="edit-profile"
              required
              disabled={isEditing ? false : true}
              onChange={onChange}
              value={values.email || ''}
            />
          </label>
          <div
            className={`form__errors-wrapper ${
              errors.name || errors.email ? 'form__errors-wrapper_type_active' : ''
            }`}
          >
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.name ? 'form__error-name_type_active' : ''
                }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${
                  errors.name ? 'form__input-error_type_active' : ''
                }`}
              >
                {errors.name || ''}
              </span>
            </div>
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.email ? 'form__error-name_type_active' : ''
                }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${
                  errors.email ? 'form__input-error_type_active' : ''
                }`}
              >
                {errors.email || ''}
              </span>
            </div>
          </div>
        </Form>
        <div
          className={`profile__actions-wrapper ${
            isEditing ? 'profile__actions-wrapper_type_hidden' : ''
          }`}
        >
          <button
            className="profile__button-action profile__button-action_type_edit"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <button
            className="profile__button-action profile__button-action_type_exit"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
