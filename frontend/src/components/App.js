import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import DeletePopup from './DeletePopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as MestoAuth from '../utils/MestoAuth.js';


import jack from '../images/jack.jpg';

function App(props) {

  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [card, setCard] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [statusReg, setStatusReg] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: "Жак Ив Кусто", about: "Искатель приключений", avatar: jack});

  const [cards, setCards] = React.useState([]);

  const [data, setData] = React.useState({email: ""});

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(err);
      });
  } 

  React.useEffect(() => {
    if(loggedIn) {
    api.getProfile()
      .then((values)=>{
        setCurrentUser(values);
      })
      .catch((err)=>{
        console.log(err);
      })

    api.getInitialCards()    
      .then((items)=>{
        console.log(items);
        setCards(items)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((values)=>{
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((values)=>{
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleAddCard(data) {
    api.addCard(data)
      .then((values)=>{
        setCards([values, ...cards]);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setCard(card);
  }

  function handleRegisterAlert(value) {
    setIsInfoTooltipOpen(true);
    setStatusReg(value);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleLogin({email, password}) {
    return MestoAuth.authorize(email, password)
      .then((value) => {
          if (value.token) {
              setLoggedIn(true);
              localStorage.setItem("token", value.token);
              history.pushState("/");
              return;
          }
      })
      .catch((err)=>{
          console.log(err);
        });
  }

  function tokenCheck() {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      MestoAuth.getContent(jwt)
        .then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setData({ email: res.email});
          }
        })
        .catch((err)=>{
          localStorage.removeItem('token');
          console.log(err);
        });
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={data.email} onSignOut={signOut}/>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} cards={cards}
            onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}>
          </ProtectedRoute>
          <Route path="/sign-in">
            <div className="sign-container">
              <Login onLogin={handleLogin}/>
            </div>
          </Route>
          <Route path="/sign-up">
            <div className="sign-container">
              <Register onClick={handleRegisterAlert} />
            </div>
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
        <DeletePopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} card={card} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={statusReg} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
