import { useState, useEffect, useContext } from 'react';
import './Navbar.scss';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/shared/logo-no-text.svg';
import Sidebar from './Sidebar/Sidebar';
import Backdrop from '../Backdrop/Backdrop';
import Searchbar from './Searchbar';

import { AuthContext } from '../../../context/AuthContext';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate()

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    context.setData({
      token: null,
      isLoggedIn: false,
    });
    navigate('/');
  }

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
    <div className={`navbar ${isSticky ? 'sticky' : ''} ${location.pathname.replace('/', '')}`}>
      <div className={`navbar-content `}>
        <Link to='/' className='title-icon inline'>
          <div className='nav-icon'>
            <Logo className={isSticky ? 'sticky-nav-colors' : ''} />
          </div>
          <div className='nav-title'>
            <div>
              <h1 className={isSticky ? 'sticky-nav-colors' : ''}>Elefanti Video</h1>
            </div>
          </div>
        </Link>
        <div className='navigation'>
          <div className='nav-link-container'>
            <Link to='/categories' className={`nav-link ${isSticky ? 'sticky-nav-colors' : ''} `}>
              Categories
            </Link>
          </div>
        </div>
        <div className='nav-login-signup'>
          <Searchbar />
          {context.data.isLoggedIn ? (
            <div className='login-link-container'>
              <div
                onClick={logout}
                className={`login-link signup ${isSticky ? 'sticky-nav-colors' : ''}`}
              >
                Log Out
              </div>
            </div>
          ) : (
            <>
              <div className='login-link-container'>
                <Link
                  to='/login'
                  className={`login-link login ${isSticky ? 'sticky-nav-colors' : ''}`}
                >
                  Log in
                </Link>
              </div>
              <div className='login-link-container'>
                <Link to='/register' className='login-link signup'>
                  Sign up
                </Link>
              </div>
            </>
          )}
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