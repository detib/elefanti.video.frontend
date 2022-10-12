import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../navbar/Navbar';

const UserLayout = ({ children }) => {
  return (
    <div className='main'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
