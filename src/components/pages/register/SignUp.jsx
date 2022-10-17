import React, { useRef } from 'react';
import './SignUpStyle.scss';
import '../../shared/styles/shared.scss';
import { ReactComponent as Logo } from '../../../assets/shared/logo.svg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value <= 8) {
      toast.warn('Password must be at least 8 characters long');
      return;
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      toast.warn('Passwords do not match');
      return;
    }
    const user = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (toast.isActive('register')) {
      return;
    }
    const notification = toast.loading('Signing Up...', {
      toastId: 'register',
      closeButton: true,
      closeOnClick: true,
    });
    await axios
      .post(`${process.env.REACT_APP_API}/api/users/signup`, user)
      .then(() => {
        toast.update(notification, {
          render: 'Signed Up successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
        navigate('/login');
      })
      .catch((error) => {
        let errorMessage;
        if (error.response.status === 409) {
          errorMessage = 'Username already exists';
        } else {
          errorMessage = 'Something went wrong';
        }
        toast.update(notification, {
          render: errorMessage,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='off' className='signup-form'>
      <div className='content-wrapper'>
        <div className='logoContainer'>
          <Logo />
        </div>
        <div className='input-wrapper'>
          <h1 className='signupTitle'>Sign Up</h1>
          <div className='double-input inline'>
            <input ref={nameRef} type='text' placeholder='Enter your name..' />
            <input ref={surnameRef} type='text' placeholder='Enter your surname..' />
          </div>
          <input ref={usernameRef} type='text' placeholder='Enter your username..' />
          <div className='double-input inline'>
            <input ref={passwordRef} type='password' placeholder='Enter your Password..' />
            <input ref={passwordConfirmRef} type='password' placeholder='Confirm your Password..' />
          </div>
          <button>Sign Up</button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
