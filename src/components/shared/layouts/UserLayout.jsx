import React from 'react';
import Navbar from '../navbar/Navbar';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '75px'}}/>
      {children}
    </>
  );
};

export default UserLayout;
