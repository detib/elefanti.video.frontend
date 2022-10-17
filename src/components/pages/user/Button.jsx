import React from 'react';
import './styles/Button.scss';

const Button = ({ buttonText, children, onclick, color }) => {
  return (
    <button style={{ color: color }} onClick={onclick} className='noselect'>
      <span className='text'>{buttonText}</span>
      <span className='icon'>{children}</span>
    </button>
  );
};

export default Button;
