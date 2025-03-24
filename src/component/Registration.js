import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setName, registerUserThunk } from '../redux/authSlice';
import './register.css';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, name, loading, error } = useSelector((state) => state.auth);

  const handleRegistration = async () => {
    try {
      await dispatch(registerUserThunk({ email, password, name })).unwrap();
      alert('Регистрация успешна! Теперь войдите в аккаунт.');
      navigate('/login');
    } catch {
      alert('Ошибка регистрации. Возможно, email уже занят.');
    }
  };

  return (
    <div className='osnovblock'>
      <div className='registracia'>
        <h1 className='reg-zag'>Регистрация</h1>
        <form className='form-reg'>
          <div className='Email'>
            <label className='label-email'>Эл.почта</label><br />
            <input className='input-email' type="email" placeholder="Email"
              value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
          </div>
          <div className='Password'>
            <label className='label-password'>Пароль</label><br />
            <input className='input-password' type="password" placeholder="Пароль"
              value={password} onChange={(e) => dispatch(setPassword(e.target.value))} />
          </div>
          <div className='Name'>
            <label className='label-name'>Имя</label><br />
            <input className='input-name' type="text" placeholder="Имя"
              value={name} onChange={(e) => dispatch(setName(e.target.value))} />
          </div>
          <div className='RegButton'>
            <button className='button-reg' type="button" onClick={handleRegistration} disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
          {error && <p className="error">{typeof error === 'string' ? error : error.message}</p>}
        </form>
        <p className='log'>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  );
};

export default Registration;
