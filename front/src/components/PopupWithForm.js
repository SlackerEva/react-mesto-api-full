import React from 'react';

import cros from '../images/cros.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__page">
        <form className="popup__content" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
          <button className="popup__close" type="button" onClick={props.onClose}><img className="popup__img" src={cros} alt="Закрыть" /></button>
          <h2 className="popup__subtitle">{props.title}</h2>
          {props.children}
          <button className="popup__button-save" type="submit">{props.submit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
