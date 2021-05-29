import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{props.email}</p>
          <button onClick={props.onSignOut} className="header__logout">Выйти</button>
        </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__auth-link" to="sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__auth-link" to="sign-up">Регистрация</Link>
        </Route>
    </header>
  );
}

export default Header;