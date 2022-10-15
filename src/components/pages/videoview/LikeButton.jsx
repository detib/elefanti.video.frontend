import React, { useRef, useLayoutEffect } from 'react';
import './styles/LikeButton.scss';

const LikeButton = ({ onClick, checked }) => {
  const checkboxRef = useRef();

  useLayoutEffect(() => {
    checkboxRef.current.checked = checked;
  }, [checked]);

  return (
    <label className='like'>
      <input ref={checkboxRef} onClick={onClick} type='checkbox' />
      <div className='heart' />
    </label>
  );
};

export default LikeButton;
