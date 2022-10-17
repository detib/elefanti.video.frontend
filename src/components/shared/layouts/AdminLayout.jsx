import React from 'react';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import Footer from '../Footer/Footer';
import './AdminLayout.scss';

const AdminLayout = ({ children, className }) => {
  return (
    <div className={`admin-main ${className}`}>
      <AdminNavbar />
      <main className='admin-layout-content'>{children}</main>
    </div>
  );
};

export default AdminLayout;
