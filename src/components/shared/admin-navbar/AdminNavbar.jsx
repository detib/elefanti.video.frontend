import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './AdminNavbar.scss';
import '../styles/shared.scss';

const AdminNavbar = ({ children, isOpen, setIsOpen }) => {
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/',
      name: 'Home',
      icon: <AiFillHome />,
    },
    {
      path: '/admin/videos',
      name: 'Videos',
      icon: <BsFillPlayCircleFill />,
    },
    {
      path: '/admin/categories',
      name: 'Categories',
      icon: <MdDashboard />,
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
