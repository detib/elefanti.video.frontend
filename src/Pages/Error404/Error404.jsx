import React from 'react';
import UserLayout from '../../components/shared/layouts/UserLayout';
import './Error404.scss';
import '../../components/shared/styles/shared.scss';
import { ReactComponent as Elephant404 } from '../../assets/shared/elephant-404.svg';

const Error404 = () => {
  return (
    <UserLayout className='error'>
      <div className='error-page flex-col'>
        <div className='image-wrapper'>
          <Elephant404 />
        </div>
        <h3>Page not found</h3>
      </div>
    </UserLayout>
  );
};

export default Error404;
