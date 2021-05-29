import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title={"Обновить аватар"} name={"avatar"} submit={"Сохранить"}>
      <label className="popup__field">
        <input id="avatarlink-input" className="popup__input" ref={avatarRef} type="url" name="avatarlink" placeholder="Ссылка на картинку" required />
        <span className="avatarlink-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
