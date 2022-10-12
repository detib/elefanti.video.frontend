import React from 'react';
import './Searchbar.scss';
import '../styles/shared.scss';

import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Searchbar = () => {
  const queryInputRef = useRef();
  const navigate = useNavigate();

  const searchByQuery = (e) => {
    e.preventDefault();
    const queryValue = queryInputRef.current.value.trim();
    if (queryValue == null || queryValue == '') return;
    queryInputRef.current.value = '';
    navigate(`/search/${queryValue}`);
  };

  return (
    <form className='search-input-container shared-input-container inline'>
      <input
        ref={queryInputRef}
        type='search'
        id='navsearch'
        className='search-input shared-input'
        placeholder='Search videos'
      />
      <button type='submit'
        onClick={(e) => searchByQuery(e)}
        className='search-icon-container shared-icon-container center-item'
      >
        <BsSearch />
      </button>
    </form>
  );
};

export default Searchbar;
