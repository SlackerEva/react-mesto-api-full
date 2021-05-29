import React from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import trash from '../images/trash.svg';
import heart from '../images/heart.svg';
import blackHeart from '../images/blackHeart.svg';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__button-trash ${isOwn ? '' : 'not-show-trashbean'}`);
 
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButton = (`${isLiked ? blackHeart : heart}`);

console.log(props.card);

  function handleClick() {   
    props.onCardClick(props.card);
  }

  function handleLikeClick() {   
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {   
    props.onCardDelete(props.card);
  }
  
  return (
    <li className="card" >
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}><img className="card__tresh" src={trash} alt="Удалить" /></button>
      <button className="card__button-show" type="button" onClick={handleClick}><img className="card__img" src={props.card.link} alt={props.card.name} /></button>
      <div className="card__panel">
        <h2 className="card__subtitle">{props.card.name}</h2>
        <button className="card__button" type="button" onClick={handleLikeClick}><img className="card__like" src={cardLikeButton} alt="Лайк" /><p className="card__like-count">{props.card.likes.length}</p></button>
      </div>
    </li>
  );
}

export default Card;
