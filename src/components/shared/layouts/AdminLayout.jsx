import React from 'react';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import Footer from '../Footer/Footer';
import './AdminLayout.scss';

const AdminLayout = ({ children, className }) => {
  return (
    <div className={`main ${className}`}>
      <AdminNavbar  />
      <div className='content'>
        <main>{children}</main>
        </div>
      
      
    </div>
  );
};

export default AdminLayout;