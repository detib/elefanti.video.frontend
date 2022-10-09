import { useState, useEffect } from 'react';
import './Navbar.scss';

import { Link } from 'react-router-dom';
import Logo from '../../../assets/shared/logo.png';
import Sidebar from './Sidebar/Sidebar';
import Backdrop from '../Backdrop/Backdrop';
import Searchbar from './Searchbar';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      setIsSticky(scrollHeight > 80 ? true : false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const zIndex = 100;

  return (
    <div className='navbar'>
      <div className={`navbar-content ${isSticky ? 'sticky' : ''}`}>
        <div className='title-icon inline'>
          <div className='nav-icon'>
            {/* <Logo className={isSticky ? 'sticky-nav-colors' : ''} /> */}
          </div>
          <div className='nav-title'>
            <Link to='/'>
              <h1 className={isSticky ? 'sticky-nav-colors' : ''}>Elefanti Video</h1>
            </Link>
          </div>
        </div>
        <div className='navigation'>
          <div className='nav-link-container'>
            <Link to='/' className={`nav-link ${isSticky ? 'sticky-nav-colors' : ''} `}>
              Link
            </Link>
          </div>
        </div>
        <div className='nav-login-signup'>
          <Searchbar />
          <div className='login-link-container'>
            <Link to='/signin' className={`login-link login ${isSticky ? 'sticky-nav-colors' : ''}`}>
              Log in
            </Link>
          </div>
          <div className='login-link-container'>
            <Link to='/signup' className='login-link signup'>
              Sign up
            </Link>
          </div>
        </div>
        <div onClick={showSidebar} className='hamburger-menu'>
          <div className='hamburger-line' />
          <div className='hamburger-line' />
          <div className='hamburger-line' />
        </div>
      </div>
      {sidebar ? <Backdrop click={showSidebar} zIndex={zIndex - 1} /> : null}
      {sidebar ? <Sidebar click={showSidebar} zIndex={zIndex} /> : null}
    </div>
  );
};

export default Navbar;
