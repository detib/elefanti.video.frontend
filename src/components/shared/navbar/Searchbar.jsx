import React from 'react';
import './Searchbar.scss';
import '../styles/shared.scss';

import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Searchbar = () => {
  const queryInputRef = useRef();
  const navigate = useNavigate();

  const searchByQuery = () => {
    const queryValue = queryInputRef.current.value.trim();
    if (queryValue == null || queryValue == '') return;
    navigate(`searchResult/${queryValue}`);
  };

  return (
    <div className='search-input-container shared-input-container inline'>
      <input
        ref={queryInputRef}
        type='search'
        id='navsearch'
        className='search-input shared-input'
        placeholder='Search videos'
      />
      <div
        onClick={() => searchByQuery()}
        className='search-icon-container shared-icon-container center-item'
      >
        <BsSearch />
      </div>
    </div>
  );
};

export default Searchbar;
