import React from 'react';
import './Sidebar.scss';
import '../../styles/shared.scss';

import { ReactComponent as Logo } from '../../../../assets/shared/logo-no-text.svg'
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar';

const Sidebar = (props) => {
  return (
    <div style={{ zIndex: props.zIndex }} className='side-bar'>
      <div className='sidebar-logo inline spread'>
        <div className='sidebar-icon-title inline spread'>
          <div className='sidebar-icon'><Logo /></div>
          <div>
            <Link className='sidebar-title' to='/'>
              Elefanti Video
            </Link>
          </div>
        </div>
        <CgClose onClick={props.click} />
      </div>
      <div className='sidebar-links'>
        <div className='navigation-link '>
          <div className='main-link inline spread'>
            <p className='mobile-nav-link'>
              <Link to={'/'}>Link</Link>
            </p>
          </div>
        </div>
      </div>
      <div className='sidebar-auth'>
        <div className='auth-navigations'>
          <div className='login-link-container'>
            <Link to='/login' className='mobile-login-link'>
              Log In
            </Link>
          </div>
          <div className='login-link-container'>
            <Link to='/register' className='mobile-login-link'>
              Sign Up
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>
    </div>
  );
};

export default Sidebar;
