import React from 'react';

function Login(props) {

    const [data, setData] = React.useState({
        password: "",
        email: "",
      });

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(data);

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
            <h2 className="sign-container__title">Вход</h2>
            <label className="sign-container__field">
                <input id="email-input" className="sign-container__input" type="url" value={data.email} name="email" onChange={handleChange} placeholder="Email" required />
                <span className="email-input-error"></span>
            </label>
            <label className="sign-container__field">
                <input id="password-input" className="sign-container__input" type="url" value={data.password} name="password" onChange={handleChange} placeholder="Пароль" required />
                <span className="password-input-error"></span>
            </label>
            <button className="sign-container__button" onClick={handleSubmit}>Войти</button>
        </>
    );
}

export default Login;