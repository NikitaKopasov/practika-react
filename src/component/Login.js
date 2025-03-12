import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../component/auth';
import '../component/login.css';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(userData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert('Ошибка авторизации. Проверьте email и пароль.');
    }
  };

  return (
    <div className='osnovblock'>
      <div className='avtorizacia'>
        <h1 className='auth-zag'>Авторизация</h1>
        <form className='form-login'>
          <div className='email'>
            <label className='label-login'>Логин (Email)</label><br />
            <input className='input-login' type="email" placeholder="Email"
              value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          </div>
          <div className='password'>
            <label className='label-password'>Пароль</label><br />
            <input className='input-password' type="password" placeholder="Пароль"
              value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
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
