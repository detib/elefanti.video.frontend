import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import VideoView from './Pages/Videoview/VideoView';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/auth/login/Login';
import Register from './Pages/auth/register/Register';
import Categories from './Pages/Categories/Categories';
import SingleCategory from './Pages/SingleCategory/SingleCategory';
import Search from './Pages/Search/Search';
import Error404 from './Pages/Error404/Error404';
import User from './Pages/User/User';

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
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:categoryId' element={<SingleCategory />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/watch/:videoId' element={<VideoView />} />
        <Route path='*' element={<Error404 />} />
        {context.data.isLoggedIn ? (
          <>
            {jwtDecode(context.data.token)[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ] === 'admin' ? (
              <Route path='/admin' element={<div>Admin</div>} />
            ) : null}
            <Route path='/user' element={<User />} />
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
