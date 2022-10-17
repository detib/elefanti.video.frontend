import React, { useState } from 'react';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import Footer from '../Footer/Footer';
import './AdminLayout.scss';

const AdminLayout = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`admin-main ${className}`}>
      <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`${isOpen && 'nav-open'} admin-layout-content`}>{children}</main>
    </div>
  );
};

export default AdminLayout;
