import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import VideoView from './pages/Videoview/VideoView';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';

import { AuthContext } from './context/AuthContext';
import jwtDecode from 'jwt-decode';

const App = () => {
  const context = useContext(AuthContext);

  // in this function we check if the JWT is valid,
  // if it is not valid we remove it from the local storage
  // and we set the state to false
  const checkToken = () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('auth-token');
          context.setData({
            token: null,
            isLoggedIn: false,
          });
        }
      } catch (error) {
        localStorage.removeItem('auth-token');
        context.setData({
          token: null,
          isLoggedIn: false,
        });
        return;
      }
    }
  };


  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/watch' element={<VideoView />} />
        <Route path='*' element={<div>404</div>} />
        {context.data.isLoggedIn ? (
          <>
            {jwtDecode(context.data.token)[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ] === 'admin' ? (
              <Route path='/admin' element={<div>Admin</div>} />
            ) : null}
            <Route path='/user' element={<div>User</div>} />
          </>
        ) : null}
        ;
      </Routes>
      <ToastContainer
        closeOnClick={true}
        theme='colored'
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </Router>
  );
};

export default App;
