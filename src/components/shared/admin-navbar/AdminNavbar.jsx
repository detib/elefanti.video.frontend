import React, { useState } from 'react';
import { FaTh, FaBars } from 'react-icons/fa';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './AdminNavbar.scss';
import '../styles/shared.scss';

const AdminNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/video',
      name: 'Videos',
      icon: <BsFillPlayCircleFill />,
    },
    {
      path: '',
      name: 'Categories',
      icon: <BiCategoryAlt />,
    },
  ];

  return (
    <div className='admin-nav-container'>
      <div className={`${isOpen ? 'sidebar-open' : ''} sidebar`}>
        <div className='top_section inline spread'>
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className='logo'>
            Elefanti Video
          </h1>
          <div onClick={toggle} className='bars'>
            <FaBars />
          </div>
        </div>
        <div className='pages flex-col'>
          {menuItem.map((item, index) => (
            <Link to={item.path} key={index} className='link inline'>
              <div className='icon center-item'>{item.icon}</div>
              <p className='link_text'>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
