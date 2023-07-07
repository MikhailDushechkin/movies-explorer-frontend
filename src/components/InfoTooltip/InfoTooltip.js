import React from 'react';

import './InfoTooltip.css'

import resolveSignImage from '../../images/resolve-sign-image.png';
import rejectSignImage from '../../images/reject-sign-image.png';

function InfoTooltip(props) {
  function closePopupOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup ${props.name}-popup ${props.isOpen && 'popup_opened'}`}
      onClick={closePopupOnOverlay}
    >
      <div className="popup__container">
        <img
          className="popup__icon"
          src={props.isSuccess ? resolveSignImage : rejectSignImage}
          alt={
            props.isSuccess
              ? 'иконка успешного выполнения действия'
              : 'иконка неуспешного выполнения действия'
          }
        />
        <h2 className="popup__title">
          {props.message}
        </h2>
        <button
          type="button"
          className={`popup__close-button ${props.name}-popup__close-button`}
          aria-label="Закрыть поп-ап"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
