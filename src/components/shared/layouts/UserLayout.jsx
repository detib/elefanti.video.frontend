import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../navbar/Navbar';

const UserLayout = ({ children, className }) => {
  return (
    <div className={`main ${className}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
