import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, loginUserThunk } from '../redux/authSlice';
import '../component/login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      navigate('/');
    } catch {
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
              value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
          </div>
          <div className='password'>
            <label className='label-password'>Пароль</label><br />
            <input className='input-password' type="password" placeholder="Пароль"
              value={password} onChange={(e) => dispatch(setPassword(e.target.value))} />
          </div>
          <div className='LogButton'>
            <button className='Button-login' type="button" onClick={handleLogin} disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </div>
          {error && <p className="error">{typeof error === 'string' ? error : error.message}</p>}
        </form>
        <p className='registr'>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
      </div>
    </div>
  );
};

export default Login;
