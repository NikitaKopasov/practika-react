import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
const Registration = () => {
  const [userData, setUserData] = useState({ email: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      await axios.post("http://localhost:7000/auth/registration", userData);
      alert('Регистрация успешна! Теперь войдите в аккаунт.');
      navigate('/login'); // После успешной регистрации отправляем на логин
    } catch (err) {
      console.error('Registration error:', err);
      alert('Ошибка регистрации. Возможно, email уже занят.');
    }
  };
  const RegEmail = (e) => setUserData({ ...userData, email: e.target.value });
  const RegPassword = (e) => setUserData({ ...userData, password: e.target.value });
  const RegName = (e) => setUserData({ ...userData, name: e.target.value });
  return (
    <div className='osnovblock'>
      <div className='registracia'>

        <h1 className='reg-zag'>Регистрация</h1>

        <form className='form-reg'>

          <div className='Email'>
            <label className='label-email'>Эл.почта</label><br></br>
            <input className='input-email' type="email" placeholder="Email" value={userData.email} onChange={RegEmail} />
          </div>

          <div className='Password'>
            <label className='label-password'>Пароль</label><br></br>
            <input className='input-password' type="password" placeholder="Пароль" value={userData.password} onChange={RegPassword} />
          </div>

          <div className='Name'>
            <label className='label-name'>Имя</label><br></br>
            <input className='input-name' type="text" placeholder="Имя" value={userData.name} onChange={RegName} />
          </div>

          <div className='RegButton'>
            <button className='button-reg' type="button" onClick={handleRegistration}>Зарегистрироваться</button>
          </div>

        </form>
        <p className='log'>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  );
};

export default Registration;
