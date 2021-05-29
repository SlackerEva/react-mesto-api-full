import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

import edit from '../images/edit.svg';
import plus from '../images/plus.svg';

function Main(props) {

  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="intro">
        <div className="intro__wrapper-avatar">
          <img className="intro__img" src={user.avatar} alt="Аватарка" />
          <button className="intro__button-edit-avatar" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <h1 className="intro__title">{user.name}</h1>
        <p className="intro__paragraph">{user.about}</p>
        <button className="intro__button-edit" type="button" onClick={props.onEditProfile}>
          <img className="intro__img-edit" src={edit} alt="Редактировать" />
        </button>
        <button className="intro__button-add" type="button" onClick={props.onAddPlace}>
          <img className="intro__img-add" src={plus} alt="Добавить" />
        </button>
      </section>
      <section className="gallery">
        <ul className="cards">
          {props.cards !== undefined ? props.cards.map((item) => {
            return (<Card card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
          }) : props.cards}
        </ul>
      </section>
    </main>
  );
}

export default Main;
