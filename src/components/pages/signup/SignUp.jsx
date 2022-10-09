import React from 'react';
import './SignUpStyle.scss';
import logo from '../../../assets/shared/logo.png';

const SignUp = () => {
  return (
    <div>
      <form autoComplete='off' className='formFields'>
        <div className='formField'>
          <div className='logoContainer'>
            <img src={logo} className='logo' />
          </div>

          <div className='formInput'>
            <h1 className='loginTitle'>Sign Up</h1>
            <input type='text' placeholder='Enter your name..'></input>
            <input type='text' placeholder='Enter your surname..'></input>
            <input type='email' placeholder='Enter your email..' />
            <input type='password' placeholder='Enter your Password..' />
            <input type='password' placeholder='Confirm your Password..' />
            <button>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
