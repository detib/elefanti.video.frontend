import React from 'react';
import './styles/LikeButton.scss'

const LikeButton = ({ onClick }) => {
  return (
    <label onClick={onClick} className='like'>
      <input type='checkbox' />
      <div className='heart' />
    </label>
  );
};

export default LikeButton;
