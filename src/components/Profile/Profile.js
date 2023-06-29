import React from 'react';

import MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useValidation from '../../hooks/useValidation';
import Preloader from '../Preloader/Preloader';
import Form from '../Form/Form';

import './Profile.css';

function Profile({ isLogout, setIsLoading, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userData, setUserData] = React.useState(currentUser.currentUser);
  const nameInputRef = React.useRef(false);

  const [isEdit, setEditStatus] = React.useState(false);
  const {
    values = currentUser,
    errors,
    isFormValid,
    onChange,
    resetValidation,
  } = useValidation();

  async function handleEditClick(evt) {
    evt.preventDefault();
    await setEditStatus(!isEdit);
    nameInputRef.current.focus();
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setUserData({
      name: values.name,
      email: values.email,
    });

    MainApi.changeUserInfo({
      name: values.name,
      email: values.email,
    })
      .then(() => {
        setEditStatus(false);
      })
      .catch(async (err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    resetValidation(false, userData);
  }, [resetValidation, userData]);

  return (
    <main className="profile">
      {isLoading ? (
        <Preloader />
      ) : (
        <section className="profile__wrapper">
          <h1 className="profile__title">
            {`Привет, ${userData.name || ''}`}!
          </h1>
          <Form
            name="edit-profile"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            isEditing={isEdit}
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
                disabled={isEdit ? false : true}
                ref={nameInputRef}
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
                disabled={isEdit ? false : true}
                onChange={onChange}
                value={values.email || ''}
              />
            </label>
            <div
              className={`form__errors-wrapper ${
                errors.name || errors.email
                  ? 'form__errors-wrapper_type_active'
                  : ''
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
              isEdit ? 'profile__actions-wrapper_type_hidden' : ''
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
              onClick={isLogout}
              className="profile__button-action profile__button-action_type_exit"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Profile;
