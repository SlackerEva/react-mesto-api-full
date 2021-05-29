import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const nameRef = React.useRef("");
  const linkRef = React.useRef("");
  console.log({...props});
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
    nameRef.current.value = "";
    linkRef.current.value = "";
  } 

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title={"Новое место"} name={"add"} submit={"Сохранить"}>
      <label className="popup__field">
        <input id="placename-input" className="popup__input" ref={nameRef} type="text" name="placename" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="placename-input-error"></span>
      </label>
      <label className="popup__field">
        <input id="placelink-input" className="popup__input" ref={linkRef} type="url" name="placelink" placeholder="Ссылка на картинку" required />
        <span className="placelink-input-error"></span>
      </label>
  </PopupWithForm>
  );
}

export default AddPlacePopup;
