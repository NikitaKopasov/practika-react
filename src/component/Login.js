import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../component/login.css'
const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:7000/auth/login", userData);
      const token = response.data.token;

      localStorage.setItem('token', token); // Сохраняем токен
      navigate('/'); // Редирект на главную
    } catch (err) {
      console.error('Login error:', err);
      alert('Ошибка авторизации. Проверьте email и пароль.');
    }
  };
  const onChangeEmail = (e) => setUserData({ ...userData, email: e.target.value });
  const onChangePassword = (e) => setUserData({ ...userData, password: e.target.value })
  return (
    <div className='osnovblock'>
      <div className='avtorizacia'>
        <h1 className='auth-zag'>Авторизация</h1>
        <form className='form-login'>

          <div className='email'>
            <label className='label-login'>Логин (Email)</label> <br></br>
            <input className='input-login' type="email" placeholder="Email" value={userData.email} onChange={onChangeEmail} />
          </div>

          <div className='password'>
            <label className='label-password'>Пароль</label><br></br>
            <input className='input-password' type="password" placeholder="Пароль" value={userData.password} onChange={onChangePassword} />
          </div>

          <div className='LogButton'>
            <button className='Button-login' type="button" onClick={handleLogin}>Войти</button>
          </div>

        </form>
        <p className='registr'>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
      </div>
    </div>
  );
};

export default Login;
