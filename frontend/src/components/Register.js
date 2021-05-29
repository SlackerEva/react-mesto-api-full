import React from 'react';
import { useHistory } from 'react-router-dom';
import * as MestoAuth from '../utils/MestoAuth.js';

function Register(props) {

  const [data, setData] = React.useState({
    email: "",
    password: ""
  });

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    let {email, password} = data;
    MestoAuth.register(email, password)
      .then((res) => {
        if (res.statusCode !== 400){
          props.onClick(true);
          history.push("/sign-in");
        }
      })
      .catch((err)=>{
        props.onClick(false);
        console.log(err);
      });
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setData(state => ({
      ...state,
      [name]: value
    }));
  }


  return (
      <>
        <h2 className="sign-container__title">Регистрация</h2>
        <label className="sign-container__field">
            <input id="email-input" className="sign-container__input" type="url" name="email" value={data.email} onChange={handleChange} placeholder="Email" required />
            <span className="email-input-error"></span>
        </label>
        <label className="sign-container__field">
            <input id="password-input" className="sign-container__input" type="url" name="password" value={data.password} onChange={handleChange} placeholder="Пароль" required />
            <span className="password-input-error"></span>
        </label>
        <button className="sign-container__button" onClick={handleSubmit}>Зарегестрироваться</button>
        <a className="sign-container__link" href="/sign-in"><p className="sign-container__paragraph">Уже зарегистрированы? Войти</p></a>
    </>
  );
}

export default Register;
