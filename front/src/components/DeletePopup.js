import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeletePopup(props) {

  function handleDeleteClick() {   
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleDeleteClick} title={"Вы уверены?"} name={"delete"} submit={"Да"} />
  );
}

export default DeletePopup;
