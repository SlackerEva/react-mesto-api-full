import React from 'react';

import cros from '../images/cros.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup-show ${props.selectedCard ? "popup_opened" : ""}`}>
      <div className="popup__page">
        <div className="popup__content-show">
          <button className="popup__close" type="button" onClick={props.onClose}><img className="popup__img" src={cros} alt="Закрыть" /></button>
          <img className="popup__show-img" src={props.card.link} alt={props.card.name} />
          <p className="popup__text">{props.card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
