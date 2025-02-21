import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './board/App';
import BoardPage from './board/BoardPage';
import Registration from './component/Registration';
import Login from './component/Login';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/board/:id" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
      </Routes>
    </Router>
  </Provider>
);
