import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './board/App';
import BoardPage from './board/BoardPage';
import Registration from './component/Registration';
import Login from './component/Login';

const ROUTES = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  HOME: '/',
  BOARD: '/board/:id',
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.HOME} element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path={ROUTES.BOARD} element={<PrivateRoute><BoardPage /></PrivateRoute>} />
      </Routes>
    </Router>
  </Provider>
);

