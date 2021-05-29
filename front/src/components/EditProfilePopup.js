import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description , setDescription ] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title={"Редактировать профиль"} name={"edit"} submit={"Сохранить"}>
      <label className="popup__field">
        <input id="username-input" className="popup__input" type="text" name="username" value={name} onChange={handleNameChange} placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="username-input-error"></span>
      </label>
      <label className="popup__field">
        <input id="userjob-input" className="popup__input" type="text" name="userjob" value={description} onChange={handleDescriptionChange} placeholder="О Себе" minLength="2" maxLength="200" required />
        <span className="userjob-input-error"></span>
      </label>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
