import React from 'react';

import cros from '../images/cros.svg';
import union from '../images/union.svg';
import unionCheck from '../images/unionCheck.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup-show ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__page">
        <div className="popup__content-show">
          <button className="popup__close" type="button" onClick={props.onClose}><img className="popup__img" src={cros} alt="Закрыть" /></button>
          <div className="popup__container">
              <img className="popup__img-auth" src={props.status === true? unionCheck :  union} alt="Внимание!"/>
              <p className="popup__warning">{props.status === true? "Вы успешно зарегистрировались!":  "Что-то пошло не так! Попробуйте ещё раз."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;