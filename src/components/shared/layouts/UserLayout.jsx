import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../navbar/Navbar';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
