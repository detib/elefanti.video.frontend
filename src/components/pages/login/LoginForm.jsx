import React from 'react';
import './LoginForm.scss';
import { ReactComponent as Logo } from '../../../assets/shared/logo.svg'
import { useRef } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const LoginForm = () => {
  const context = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      toast.error('Please fill all fields');
      return;
    }
    if (toast.isActive('login')) {
      return;
    }
    const notification = toast.loading('Logging in...', {
      toastId: 'login',
      closeButton: true,
      closeOnClick: true,
    });
    await axios
      .post(`${process.env.REACT_APP_API}/api/users/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('auth-token', JSON.stringify(token));
        // handle state change
        context.setData({
          token: token,
          isLoggedIn: true,
        });
        toast.update(notification, {
          render: 'Logged in successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
        navigate('/');
      })
      .catch((error) => {
        let errorMessage;
        if (error.response.status === 404) {
          // clear fields
          usernameRef.current.value = '';
          passwordRef.current.value = '';
          errorMessage = 'User not found';
        } else if (error.response.status === 401) {
          // clear fields
          passwordRef.current.value = '';
          errorMessage = 'Incorrect password';
        } else {
          errorMessage = 'Something went wrong';
        }
        toast.update(notification, {
          render: errorMessage,
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  return (
    <form onSubmit={handleLogin} autoComplete='off' className='login-form'>
      <div className='content-wrapper'>
        <div className='logoContainer'>
          <Logo />
        </div>
        <div className='input-wrapper'>
          <h1 className='loginTitle'>Log in</h1>
          <input ref={usernameRef} type='text' placeholder='Enter your username' />
          <input ref={passwordRef} type='password' placeholder='Enter your Password..' />
          <button type='submit'>Log in</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
