import React from 'react';
import Navbar from '../navbar/Navbar';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
